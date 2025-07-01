import { useEffect } from "react";
import useWebContainer from "src/stores/webContainer";
import { VirtualFile } from "src/structures/VirtualFile";
import { filesToWebContainerFs } from "src/utils/playground";

export default function usePlayground() {
  const {
    wc,
    url,
    isBooted,
    status,
    boot,
    mount,
    runDevServer,
    setupListeners,
    installDependencies,
  } = useWebContainer();

  const mountFiles = async (files: VirtualFile[]) => {
    if (!wc) {
      return;
    }
    const wcFsTree = filesToWebContainerFs(files);
    mount(wcFsTree);
  };

  useEffect(() => {
    const warmUpWC = async () => {
      if (!isBooted && !wc) {
        await boot();
      } else if (wc) {
        const rawFiles: Record<string, string> = import.meta.glob(
          ["../.templates/**/*", "!../.templates/node_modules/**"],
          {
            eager: true,
            query: "?raw",
            import: "default",
          }
        );
        const files = Object.entries(rawFiles).map(([path, content]) => {
          const _path = path.replace("../.templates/", "");
          return new VirtualFile(_path, content, wc);
        });
        await mountFiles(files);
        await installDependencies();
        await runDevServer();
        setupListeners();
      }
    };

    warmUpWC();
  }, [wc, isBooted]);

  return {
    url,
    status,
  };
}

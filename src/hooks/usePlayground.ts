import { useEffect, useState } from "react";
import useWebContainer from "src/stores/webContainer";
import { VirtualFile } from "src/structures/VirtualFile";
import { PlaygroundStatus } from "src/types/Playground";
import { filesToWebContainerFs } from "src/utils/playground";

export default function usePlayground() {
  const { wc, boot, isBooted } = useWebContainer();
  const [status, setStatus] = useState<PlaygroundStatus>(
    PlaygroundStatus.BOOTING
  );

  const mountFiles = async (files: VirtualFile[]) => {
    if (!wc) return;

    const wcFsTree = filesToWebContainerFs(files);

    console.log(wcFsTree);

    setStatus(PlaygroundStatus.MOUNTING);
    await wc.mount(filesToWebContainerFs(files));
    setStatus(PlaygroundStatus.INSTALLING);
  };

  useEffect(() => {
    const warmUpWC = async () => {
      if (!isBooted && !wc) {
        await boot();
      } else if (wc) {
        const rawFiles = import.meta.glob("../.templates/**/*", {
          eager: true,
          as: "raw",
        });
        const files = Object.entries(rawFiles).map(
          ([path, content]) => new VirtualFile(path, content, wc)
        );
        await mountFiles(files);
      }
    };

    warmUpWC();
  }, [wc, isBooted]);

  return {
    status,
  };
}

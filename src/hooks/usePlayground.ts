import { useCallback, useEffect, useState } from "react";
import useWebContainer from "src/stores/webContainer";
import { VirtualFile } from "src/structures/VirtualFile";
import { PlaygroundStatus } from "src/types/Playground";

export default function usePlayground() {
  const { wc, boot, isBooted } = useWebContainer();
  const [status, setStatus] = useState<PlaygroundStatus>(
    PlaygroundStatus.BOOTING
  );

  const mountFiles = useCallback((files: VirtualFile[]) => {
    setStatus(PlaygroundStatus.MOUNTING);
    console.log(files);
    setTimeout(() => {
      setStatus(PlaygroundStatus.INSTALLING);
    }, 2000);
  }, []);

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
        mountFiles(files);
      }
    };

    warmUpWC();
  }, [wc, isBooted]);

  return {
    status,
  };
}

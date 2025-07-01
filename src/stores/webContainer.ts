import { FileSystemTree, WebContainer } from "@webcontainer/api";
import { PlaygroundStatus } from "src/types/Playground";
import { create } from "zustand";

interface WebContainerStore {
  url: string | null;
  isBooted: boolean;
  hasError: boolean;
  wc: WebContainer | null;
  status: PlaygroundStatus;
  boot: () => Promise<void>;
  setupListeners: VoidFunction;
  runDevServer: () => Promise<void>;
  installDependencies: () => Promise<void>;
  setStatus(status: PlaygroundStatus): void;
  mount: (files: FileSystemTree) => Promise<void>;
}

const useWebContainer = create<WebContainerStore>()((set, get) => ({
  wc: null,
  url: null,
  isBooted: false,
  hasError: false,
  status: PlaygroundStatus.BOOTING,
  boot: async () => {
    try {
      const _wc = await WebContainer.boot();
      set({
        wc: _wc,
        isBooted: true,
        hasError: false,
      });
    } catch {
      set({ hasError: true });
    }
  },
  setStatus: (status) => {
    set({ status });
  },
  mount: async (files) => {
    set({ status: PlaygroundStatus.MOUNTING });
    const wc = get().wc;
    if (wc) {
      await wc.mount(files);
    }
  },
  installDependencies: async () => {
    const wc = get().wc;
    if (wc) {
      set({ status: PlaygroundStatus.INSTALLING });
      const installProcess = await wc.spawn("npm", ["install"]);

      installProcess.output.pipeTo(
        new WritableStream({
          write: (chunk) => {
            console.log(chunk);
          },
        })
      );

      const exitCode = await installProcess.exit;
      if (exitCode === 0) {
      }
    }
  },
  runDevServer: async () => {
    const wc = get().wc;
    if (wc) {
      set({ status: PlaygroundStatus.STARTING });
      await wc.spawn("npm", ["start"]);
      set({ status: PlaygroundStatus.READY });
    }
  },
  setupListeners: () => {
    const wc = get().wc;
    if (wc) {
      wc.on("server-ready", (port, url) => {
        set({ url });
        console.log(`Server is running at ${url} and port ${port}`);
      });

      wc.on("error", (error) => {
        console.error("WebContainer error:", error);
      });
    }
  },
}));

export default useWebContainer;

import { WebContainer } from "@webcontainer/api";
import { PlaygroundStatus } from "src/types/Playground";
import { create } from "zustand";

interface WebContainerStore {
  url: string | null;
  isBooted: boolean;
  hasError: boolean;
  wc: WebContainer | null;
  status: PlaygroundStatus;
  boot: () => Promise<void>;
  setStatus(status: PlaygroundStatus): void;
  setUrl(url: string): void;
}

const useWebContainer = create<WebContainerStore>()((set) => ({
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
  setUrl: (url) => {
    set({ url });
  },
}));

export default useWebContainer;

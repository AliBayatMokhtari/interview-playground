import { WebContainer } from "@webcontainer/api";
import { create } from "zustand";

interface WebContainerStore {
  wc: WebContainer | null;
  isBooted: boolean;
  hasError: boolean;
  boot(): Promise<void>;
}

const useWebContainer = create<WebContainerStore>()((set) => ({
  wc: null,
  isBooted: false,
  hasError: false,
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
}));

export default useWebContainer;

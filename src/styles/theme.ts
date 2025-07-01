import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const customConfig = defineConfig({
  globalCss: {
    html: {
      backgroundColor: "bg.subtle",
    },
    "#app": {
      height: "100vh",
    },

    ".xterm-viewport": {
      overflowY: "auto !important",
    },
  },
});

export const system = createSystem(defaultConfig, customConfig);

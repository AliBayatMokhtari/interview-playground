import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const customConfig = defineConfig({
  globalCss: {
    html: {
      backgroundColor: "bg.subtle",
    },
    "#app": {
      height: "100vh",
    },
  },
});

export const system = createSystem(defaultConfig, customConfig);

import { system } from "@/theme";
import { ChakraProvider as Provider } from "@chakra-ui/react";
import { ThemeProvider } from "next-themes";
import type { PropsWithChildren } from "react";

function ChakraProvider({ children }: PropsWithChildren) {
  return (
    <ThemeProvider>
      <Provider value={system}>{children}</Provider>
    </ThemeProvider>
  );
}

export default ChakraProvider;

import { Box, Stack } from "@chakra-ui/react";
import AppHeader from "@components/header/AppHeader";
import Playground from "@components/playground/Playground";

function DefaultLayout() {
  return (
    <Stack height="100%" gap={0}>
      <AppHeader />
      <Box flexGrow={1}>
        <Playground />
      </Box>
    </Stack>
  );
}

export default DefaultLayout;

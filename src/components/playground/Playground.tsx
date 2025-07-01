import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import { Allotment } from "allotment";
import useStorageValue from "src/hooks/useStorageValue";
import { StorageKey } from "src/config/StorageKey";
import usePlayground from "src/hooks/usePlayground";
import { PlaygroundStatus } from "src/types/Playground";

import "allotment/dist/style.css";

type PaneSize = string | number;

function Playground() {
  const [[left, right], setPanes] = useStorageValue<[PaneSize, PaneSize]>(
    StorageKey.playgroundPanes,
    ["50%", "50%"]
  );

  const { url, status, terminalEl } = usePlayground();

  const handleSizeChange = (sizes: number[]) => {
    const [left, right] = sizes;
    setPanes([left, right]);
  };

  return (
    <Allotment onDragEnd={handleSizeChange}>
      <Allotment.Pane minSize={400} preferredSize={left}>
        <Box p={2}>Pane 1</Box>
      </Allotment.Pane>
      <Allotment.Pane minSize={400} preferredSize={right}>
        <Allotment vertical>
          <Allotment.Pane>
            <iframe src={url ?? ""} width="100%" height="100%" />
          </Allotment.Pane>
          <Allotment.Pane>
            <Box ref={terminalEl} height="100%" px={3} />
          </Allotment.Pane>
        </Allotment>
        {status !== PlaygroundStatus.READY && (
          <Flex p={2} gap={2} alignItems="center">
            <Spinner />
            <Text>{status.capitalizeFirstLetter()}</Text>
          </Flex>
        )}
      </Allotment.Pane>
    </Allotment>
  );
}

export default Playground;

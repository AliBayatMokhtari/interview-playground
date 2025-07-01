import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import { Allotment } from "allotment";
import useStorageValue from "src/hooks/useStorageValue";
import { StorageKey } from "src/config/StorageKey";
import usePlayground from "src/hooks/usePlayground";

import "allotment/dist/style.css";
import { PlaygroundStatus } from "src/types/Playground";

type PaneSize = string | number;

function Playground() {
  const [[left, right], setPanes] = useStorageValue<[PaneSize, PaneSize]>(
    StorageKey.playgroundPanes,
    ["50%", "50%"]
  );

  const { url, status } = usePlayground();

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
        <Box p={2}>Pane 2</Box>
        {status !== PlaygroundStatus.READY && (
          <Flex p={2} gap={2} alignItems="center">
            <Spinner />
            <Text>{status.capitalizeFirstLetter()}</Text>
          </Flex>
        )}
        {url && <iframe src={url} width="100%" height={400} />}
      </Allotment.Pane>
    </Allotment>
  );
}

export default Playground;

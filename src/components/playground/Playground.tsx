import { useEffect, useState } from "react";
import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import { Allotment } from "allotment";
import useStorageValue from "src/hooks/useStorageValue";
import { StorageKey } from "src/config/StorageKey";
import useWebContainer from "src/stores/webContainer";

import "allotment/dist/style.css";
import { VirtualFile } from "src/structures/VirtualFile";

type PaneSize = string | number;

function Playground() {
  const [showPlayground, setShowPlayground] = useState(false);
  const [[left, right], setPanes] = useStorageValue<[PaneSize, PaneSize]>(
    StorageKey.playgroundPanes,
    ["50%", "50%"]
  );

  const { wc, isBooted, boot } = useWebContainer();

  const handleSizeChange = (sizes: number[]) => {
    const [left, right] = sizes;
    setPanes([left, right]);
  };

  useEffect(() => {
    const warmUpWC = async () => {
      if (!isBooted && !wc) {
        setShowPlayground(true);
        await boot();
        setShowPlayground(false);
      } else if (wc) {
        const rawFiles = import.meta.glob("../../.templates/**/*", {
          eager: true,
          as: "raw",
        });
        const files = Object.entries(rawFiles).map(
          ([path, content]) => new VirtualFile(path, content, wc)
        );
        console.log({ files });
      }
    };

    warmUpWC();
  }, [wc]);

  return (
    <Allotment onDragEnd={handleSizeChange}>
      <Allotment.Pane minSize={400} preferredSize={left}>
        <Box p={2}>Pane 1</Box>
      </Allotment.Pane>
      <Allotment.Pane minSize={400} preferredSize={right}>
        <Box p={2}>Pane 2</Box>
        {showPlayground && (
          <Flex p={2} gap={2} alignItems="center">
            <Spinner />
            <Text>Working On It</Text>
          </Flex>
        )}
      </Allotment.Pane>
    </Allotment>
  );
}

export default Playground;

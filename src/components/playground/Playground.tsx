import { useEffect, useState } from "react";
import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import { Allotment } from "allotment";
import useStorageValue from "src/hooks/useStorageValue";
import { StorageKey } from "src/config/StorageKey";
import PlaygroundWebContainer from "./WebContainer";
import { WebContainer } from "@webcontainer/api";

import "allotment/dist/style.css";

type PaneSize = string | number;

const pwc = new PlaygroundWebContainer(new WebContainer());

function Playground() {
  const [showPlayground, setShowPlayground] = useState(false);
  const [[left, right], setPanes] = useStorageValue<[PaneSize, PaneSize]>(
    StorageKey.playgroundPanes,
    ["50%", "50%"]
  );

  const handleSizeChange = (sizes: number[]) => {
    const [left, right] = sizes;
    setPanes([left, right]);
  };

  useEffect(() => {
    if (!pwc.isBooting && !pwc.isReady) {
      setShowPlayground(true);
      pwc.boot().then(() => {
        const modules = import.meta.glob("./task_1/*.ts", {
          eager: true,
          as: "raw",
        });

        const files = Object.keys(modules).reduce((tree, filePath) => {
          const splitted = filePath.split("/");
          const fileName = splitted[splitted.length - 1];
          tree[fileName] = modules[filePath];
          return tree;
        }, {} as Record<string, string>);

        pwc.mount(files).then(() => {
          setShowPlayground(false);
        });
      });
    }
  }, []);

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

import { Box } from "@chakra-ui/react";
import { Allotment } from "allotment";
import useStorageValue, { StorageKey } from "src/hooks/useStorageValue";

// @ts-expect-error
import "allotment/dist/style.css";

type PaneSize = string | number;

function Playground() {
  const [[left, right], setPanes] = useStorageValue<[PaneSize, PaneSize]>(
    StorageKey.playgroundPanes,
    ["50%", "50%"]
  );

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
      </Allotment.Pane>
    </Allotment>
  );
}

export default Playground;

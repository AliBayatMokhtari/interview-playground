import { Box } from "@chakra-ui/react";
import { Allotment } from "allotment";

// @ts-expect-error
import "allotment/dist/style.css";

function Playground() {
  return (
    <Allotment onChange={console.log}>
      <Allotment.Pane minSize={400}>
        <Box p={2}>Pane 1</Box>
      </Allotment.Pane>
      <Allotment.Pane minSize={400}>
        <Box p={2}>Pane 2</Box>
      </Allotment.Pane>
    </Allotment>
  );
}

export default Playground;

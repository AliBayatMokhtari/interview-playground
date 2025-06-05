import ChakraProvider from "@components/providers/ChakraProvider";
import DefaultLayout from "./layouts/DefaultLayout";

function App() {
  return (
    <ChakraProvider>
      <DefaultLayout />
    </ChakraProvider>
  );
}

export default App;

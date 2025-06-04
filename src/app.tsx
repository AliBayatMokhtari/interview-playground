import ChakraProvider from "@components/providers/ChakraProvider";
import AppHeader from "@components/header/AppHeader";
import WelcomeMessage from "@components/welcome/WelcomeMessage";

function App() {
  return (
    <ChakraProvider>
      <AppHeader />

      <WelcomeMessage />
    </ChakraProvider>
  );
}

export default App;

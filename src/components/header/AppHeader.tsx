import { Card, Text, Flex } from "@chakra-ui/react";
import Button from "@components/shared/Button";

function AppHeader() {
  return (
    <Card.Root rounded={0} bgColor="blue.solid" border="none" color="white">
      <Card.Body padding={4}>
        <Flex alignItems="center" justifyContent="space-between">
          <Text fontWeight="bold" fontSize="2xl">
            Interview Playground
          </Text>

          <Button variant="surface">Login With Token</Button>
        </Flex>
      </Card.Body>
    </Card.Root>
  );
}

export default AppHeader;

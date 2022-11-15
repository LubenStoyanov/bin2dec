import { Form, json, ActionFunction, useActionData } from "react-router-dom";
import {
  Box,
  Container,
  Heading,
  Input,
  Text,
  VStack,
  Button,
  Link,
} from "@chakra-ui/react";
import converter from "./bin2dec";
import { checkFormat } from "./utils/checkformat";

export type ActionData = {
  number: null | string;
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const number = formData.get("number")?.toString().trim();
  if (number === undefined) return json<ActionData>({ number: "" });

  const errors: ActionData = {
    number: checkFormat(number),
  };

  const hasErrors = errors.number;
  if (hasErrors) return json<ActionData>(errors);

  const result = converter(number);
  return json<ActionData>({ number: result });
};

function App() {
  const number = useActionData() as ActionData;
  return (
    <Box bg="gray.200" minH="100vh">
      <Container as="main" color="gray.700">
        <VStack spacing={5}>
          <Heading as="h1" size="4xl">
            Bin2Dec
          </Heading>
          <Text fontSize="2xl">
            Convert{" "}
            <Link
              href="https://en.wikipedia.org/wiki/Binary_number"
              isExternal
              color="teal.500"
            >
              binary numbers
            </Link>{" "}
            to decimals
          </Text>
          <Form method="post">
            <VStack>
              <Input
                aria-label="convert to decimal"
                type="text"
                name="number"
                autoFocus
                borderColor="teal.500"
                focusBorderColor="teal.500"
                _hover={{ borderWidth: "2px" }}
              />
              <Button
                type="submit"
                bg="teal.500"
                _hover={{ bg: "teal.400" }}
                color="gray.200"
              >
                Convert
              </Button>
            </VStack>
          </Form>
          <Text fontSize="3xl">{number?.number}</Text>
        </VStack>
      </Container>
    </Box>
  );
}

export default App;

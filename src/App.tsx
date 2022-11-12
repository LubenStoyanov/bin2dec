import { Form, json, ActionFunction, useActionData } from "react-router-dom";
import {
  Center,
  Container,
  Heading,
  Input,
  Text,
  VStack,
  Button,
} from "@chakra-ui/react";
import "./App.css";
import converter from "./bin2dec";
import invariant from "tiny-invariant";

export type ActionData =
  | {
      binaryNumber: null | string;
    }
  | undefined;

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const binaryNumber = formData.get("number");

  const errors: ActionData = {
    binaryNumber: binaryNumber ? null : "Binary number required",
  };
  if (errors.binaryNumber) return json<ActionData>(errors);

  return json<ActionData>({ binaryNumber: String(binaryNumber) });
};

function App() {
  const binaryNumber = useActionData() as ActionData;
  const decimal = converter(binaryNumber);

  return (
    <Container>
      <VStack>
        <Heading as="h1">Bin2Dec</Heading>
        <Text>Convert binary numbers to decimals</Text>
        <Center>
          <Form method="post">
            <Input aria-label="convert to decimal" type="text" name="number" />
            <Button type="submit">Convert</Button>
          </Form>
        </Center>
      </VStack>
      <Text>{decimal}</Text>
    </Container>
  );
}

export default App;

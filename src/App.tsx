import { Form, json, ActionFunction, useActionData } from "react-router-dom";
import {
  Flex,
  Center,
  Container,
  Heading,
  Input,
  Text,
  VStack,
  Button,
} from "@chakra-ui/react";
import converter from "./bin2dec";
import { checkFormat } from "./utils/checkformat";

export type ActionData =
  | {
      number: null | string;
    }
  | undefined;

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const number = formData.get("number")?.toString().trim();
  if (number === undefined) return json<ActionData>({ number: "" });

  const errors: ActionData = {
    number: checkFormat(number),
  };

  const hasErrors = errors.number;
  if (hasErrors) return json<ActionData>(errors);

  const result = converter(String(number));
  return json<ActionData>({ number: result });
};

function App() {
  const number = useActionData() as ActionData;
  console.log(number);
  return (
    <Container as="main">
      <VStack>
        <Heading as="h1">Bin2Dec</Heading>
        <Text>Convert binary numbers to decimals</Text>
        <Center>
          <Form method="post">
            <Input aria-label="convert to decimal" type="text" name="number" />
            <Button type="submit">Convert</Button>
          </Form>
        </Center>
        <Text>{number?.number}</Text>
      </VStack>
    </Container>
  );
}

export default App;

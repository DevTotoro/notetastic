import { Center, VStack, Text, useColorMode } from '@chakra-ui/react';
import { useRouteError } from 'react-router-dom';

interface ErrorType {
  status: number;
  message: string | undefined;
  statusText: string | undefined;
}

const Error = () => {
  const error = useRouteError() as ErrorType;
  const { colorMode } = useColorMode();

  return (
    <Center minH='100vh'>
      <VStack>
        <Text fontSize='3xl'>notetastic</Text>
        <Text>Sorry, an unexpected error has occurred.</Text>
        <Text color={colorMode === 'light' ? 'red.500' : 'red.200'}>
          {error.status} - {error.message || error.statusText}
        </Text>
      </VStack>
    </Center>
  );
};

export default Error;

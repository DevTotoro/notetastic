import { useState } from 'react';
import {
  Center,
  VStack,
  Text,
  FormControl,
  FormLabel,
  FormHelperText,
  InputGroup,
  Input,
  InputLeftElement,
  InputRightElement,
  IconButton,
  Icon,
  Button,
  useColorMode,
} from '@chakra-ui/react';
import { FaEnvelope, FaKey, FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { colorMode } = useColorMode();

  const handleSignInClick = () => {
    setIsLoading(true);
    console.log('Sign in clicked');

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <Center minH='100vh'>
      <VStack spacing={5}>
        <VStack spacing={0}>
          <Text fontSize='3xl'>notetastic</Text>
          <Text as='i'>taking notes, simplified</Text>
        </VStack>

        <FormControl>
          <FormLabel>Email</FormLabel>
          <InputGroup>
            <InputLeftElement>
              <Icon
                as={FaEnvelope}
                color={colorMode === 'light' ? 'yellow.400' : 'yellow.200'}
              />
            </InputLeftElement>
            <Input type='email' variant='filled' disabled={isLoading} />
          </InputGroup>
        </FormControl>

        <FormControl>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <InputLeftElement>
              <Icon
                as={FaKey}
                color={colorMode === 'light' ? 'yellow.400' : 'yellow.200'}
              />
            </InputLeftElement>
            <Input
              type={passwordVisible ? 'text' : 'password'}
              variant='filled'
              disabled={isLoading}
            />
            <InputRightElement>
              <IconButton
                aria-label='Toggle password visibility'
                icon={
                  passwordVisible ? (
                    <Icon as={FaEyeSlash} />
                  ) : (
                    <Icon as={FaEye} />
                  )
                }
                onClick={() => setPasswordVisible(!passwordVisible)}
                colorScheme='yellow'
                variant='ghost'
                size='sm'
              />
            </InputRightElement>
          </InputGroup>
          <FormHelperText>Powered by Firebase Authentication.</FormHelperText>
        </FormControl>

        <Button
          colorScheme='yellow'
          isLoading={isLoading}
          loadingText='Signing in'
          onClick={handleSignInClick}
        >
          Sign In
        </Button>
      </VStack>
    </Center>
  );
};

export default Login;

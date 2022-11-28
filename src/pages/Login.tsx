import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  useToast,
} from '@chakra-ui/react';
import {
  FaEnvelope,
  FaKey,
  FaEye,
  FaEyeSlash,
  FaSignInAlt,
} from 'react-icons/fa';

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const { colorMode } = useColorMode();
  const toast = useToast();

  const handleSignInClick = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      navigate('/notes');

      toast({
        title: 'Welcome back!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }, 2000);
  };

  return (
    <Center minH='100vh'>
      <VStack spacing={5}>
        <VStack spacing={0}>
          <Text fontSize='3xl'>notetastic</Text>
          <Text
            as='i'
            color={colorMode === 'light' ? 'purple.500' : 'purple.200'}
          >
            note keeping, simplified
          </Text>
        </VStack>

        <FormControl>
          <FormLabel>Email</FormLabel>
          <InputGroup>
            <InputLeftElement>
              <Icon
                as={FaEnvelope}
                color={colorMode === 'light' ? 'purple.500' : 'purple.200'}
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
                color={colorMode === 'light' ? 'purple.500' : 'purple.200'}
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
                colorScheme='purple'
                variant='ghost'
                size='sm'
              />
            </InputRightElement>
          </InputGroup>
          <FormHelperText>Powered by Firebase Authentication.</FormHelperText>
        </FormControl>

        <Button
          colorScheme='purple'
          rightIcon={<Icon as={FaSignInAlt} />}
          isLoading={isLoading}
          loadingText='Signing in'
          spinnerPlacement='end'
          onClick={handleSignInClick}
        >
          Sign In
        </Button>
      </VStack>
    </Center>
  );
};

export default Login;

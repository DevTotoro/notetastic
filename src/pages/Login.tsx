import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
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
  Link,
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

// Auth
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const { colorMode } = useColorMode();
  const toast = useToast();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsLoading(false);

      navigate('/notes');
    }
  });

  const handleSignInClick = async () => {
    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      switch (error.code) {
        case 'auth/user-not-found':
          toast({
            title: 'Please register first.',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
          break;
        case 'auth/wrong-password':
        case 'auth/invalid-email':
          toast({
            title: 'Invalid credentials.',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
          break;
        default:
          toast({
            title: 'Something went wrong.',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
          break;
      }

      setIsLoading(false);
    }
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
            <Input
              type='email'
              variant='filled'
              disabled={isLoading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

        <Text>
          No account?{' '}
          <Link
            as={RouterLink}
            to='/register'
            color={colorMode === 'light' ? 'purple.500' : 'purple.200'}
          >
            Register here.
          </Link>
        </Text>
      </VStack>
    </Center>
  );
};

export default Login;

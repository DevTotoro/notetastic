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
import { FaEnvelope, FaKey, FaEye, FaEyeSlash, FaPlus } from 'react-icons/fa';

// Auth
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../firebase/config';

const Register = () => {
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

  const handleSignUpClick = async () => {
    setIsLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      setIsLoading(false);

      switch (error.code) {
        case 'auth/email-already-in-use':
          toast({
            title: 'Email already in use.',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
          break;
        case 'auth/invalid-email':
          toast({
            title: 'Please use a valid email address.',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
          break;
        case 'auth/weak-password':
          toast({
            title: 'Please use a stronger password.',
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
    }
  };

  return (
    <Center minH='100vh'>
      <VStack spacing={5}>
        <VStack spacing={0}>
          <Text fontSize='3xl'>notetastic</Text>
          <Text as='i' color={colorMode === 'light' ? 'teal.500' : 'teal.200'}>
            note keeping, simplified
          </Text>
        </VStack>

        <FormControl>
          <FormLabel>Email</FormLabel>
          <InputGroup>
            <InputLeftElement>
              <Icon
                as={FaEnvelope}
                color={colorMode === 'light' ? 'teal.500' : 'teal.200'}
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
                color={colorMode === 'light' ? 'teal.500' : 'teal.200'}
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
                colorScheme='teal'
                variant='ghost'
                size='sm'
              />
            </InputRightElement>
          </InputGroup>
          <FormHelperText>Powered by Firebase Authentication.</FormHelperText>
        </FormControl>

        <Button
          colorScheme='teal'
          rightIcon={<Icon as={FaPlus} />}
          isLoading={isLoading}
          loadingText='Signing up'
          spinnerPlacement='end'
          onClick={handleSignUpClick}
        >
          Sign Up
        </Button>

        <Text>
          Already have an account?{' '}
          <Link
            as={RouterLink}
            to='/login'
            color={colorMode === 'light' ? 'teal.500' : 'teal.200'}
          >
            Login here.
          </Link>
        </Text>
      </VStack>
    </Center>
  );
};

export default Register;

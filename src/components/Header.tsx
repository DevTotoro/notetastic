import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import {
  Stack,
  Spacer,
  Text,
  IconButton,
  Icon,
  useColorMode,
  useToast,
} from '@chakra-ui/react';
import { FaStickyNote, FaCheckCircle, FaSignOutAlt } from 'react-icons/fa';

// Auth
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config';

const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { colorMode } = useColorMode();
  const toast = useToast();

  const handleSignOutClick = async () => {
    try {
      await signOut(auth);
    } catch (error: any) {
      console.error(error.code, error.message);

      toast({
        title: 'Internal Server Error',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    navigate('/login');

    toast({
      title: 'Bye!',
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Stack direction='row' w='100%' py='3'>
      <IconButton
        aria-label='Notes'
        icon={<Icon as={FaStickyNote} />}
        variant={pathname === '/notes' ? 'solid' : 'ghost'}
        colorScheme='purple'
        as={RouterLink}
        to='/notes'
      />
      <IconButton
        aria-label='Todos'
        icon={<Icon as={FaCheckCircle} />}
        variant={pathname === '/todos' ? 'solid' : 'ghost'}
        colorScheme='purple'
        as={RouterLink}
        to='/todos'
      />

      <Spacer />
      <Stack spacing='0' align='center'>
        <Text color={colorMode === 'light' ? 'purple.500' : 'purple.200'}>
          notetastic
        </Text>
        <Text
          as='i'
          fontSize='sm'
          color={colorMode === 'light' ? 'gray.700' : 'gray.300'}
        >
          note keeping, simplified
        </Text>
      </Stack>
      <Spacer />
      <IconButton
        aria-label='Sign out'
        icon={<Icon as={FaSignOutAlt} />}
        variant='ghost'
        colorScheme='red'
        onClick={handleSignOutClick}
      />
    </Stack>
  );
};

export default Header;

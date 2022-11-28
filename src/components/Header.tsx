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
import {
  FaStickyNote,
  FaCheckCircle,
  FaMoon,
  FaSun,
  FaSignOutAlt,
} from 'react-icons/fa';

const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();

  const handleSignOutClick = () => {
    navigate('/login');

    toast({
      title: 'Bye!',
      status: 'success',
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
        aria-label='Toggle dark mode'
        icon={
          colorMode === 'light' ? <Icon as={FaMoon} /> : <Icon as={FaSun} />
        }
        variant='ghost'
        colorScheme='purple'
        onClick={toggleColorMode}
      />
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

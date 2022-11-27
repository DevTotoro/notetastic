import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  HStack,
  Spacer,
  Text,
  IconButton,
  Icon,
  useColorMode,
} from '@chakra-ui/react';
import {
  FaStickyNote,
  FaCheckCircle,
  FaMoon,
  FaSun,
  FaSignOutAlt,
} from 'react-icons/fa';

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { pathname } = useLocation();

  const handleSignOutClick = () => {
    console.log('Sign out clicked');
  };

  return (
    <HStack w='100%' py='3'>
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
      <Text
        fontSize='lg'
        color={colorMode === 'light' ? 'purple.500' : 'purple.200'}
      >
        notetastic
      </Text>
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
    </HStack>
  );
};

export default Header;

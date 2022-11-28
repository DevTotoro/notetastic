import type { Note as NoteType } from '../types';
import { HStack, Text, IconButton, Icon, useColorMode } from '@chakra-ui/react';
import { FaTrash } from 'react-icons/fa';

const Note = ({ id, body }: NoteType) => {
  const { colorMode } = useColorMode();

  const handleDeleteClick = () => {
    console.log('Delete note', id);
  };

  return (
    <HStack
      w='100%'
      px='5'
      py='3'
      bgColor={colorMode === 'light' ? 'gray.100' : 'gray.700'}
      borderRadius='md'
      spacing='5'
    >
      <Text
        width='100%'
        color={colorMode === 'light' ? 'gray.700' : 'gray.300'}
      >
        {body}
      </Text>
      <IconButton
        aria-label='Delete note'
        icon={<Icon as={FaTrash} />}
        onClick={handleDeleteClick}
        variant='ghost'
        size='sm'
        colorScheme='red'
      />
    </HStack>
  );
};

export default Note;

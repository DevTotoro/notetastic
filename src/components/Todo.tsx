import type { Todo as TodoType } from '../types';
import { useState } from 'react';
import {
  HStack,
  Text,
  IconButton,
  Icon,
  Checkbox,
  useColorMode,
} from '@chakra-ui/react';
import { FaTrash } from 'react-icons/fa';

const Todo = ({ id, body, completed }: TodoType) => {
  const [isCompleted, setIsCompleted] = useState(completed);

  const { colorMode } = useColorMode();

  const handleDeleteClick = () => {
    console.log('Delete todo', id);
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
      <Checkbox
        isChecked={isCompleted}
        onChange={(e) => setIsCompleted(e.target.checked)}
        colorScheme='green'
      />

      <Text
        width='100%'
        color={
          isCompleted
            ? colorMode === 'light'
              ? 'gray.500'
              : 'gray.500'
            : colorMode === 'light'
            ? 'gray.700'
            : 'gray.300'
        }
        as={isCompleted ? 's' : 'span'}
      >
        {body}
      </Text>
      <IconButton
        aria-label='Delete todo'
        icon={<Icon as={FaTrash} />}
        onClick={handleDeleteClick}
        variant='ghost'
        size='sm'
        colorScheme='red'
      />
    </HStack>
  );
};

export default Todo;

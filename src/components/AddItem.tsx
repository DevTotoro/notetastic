import { useState } from 'react';
import {
  HStack,
  FormControl,
  FormErrorMessage,
  Input,
  IconButton,
  Icon,
  useColorMode,
} from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa';

const AddItem = ({
  type,
  callback,
}: {
  type: 'Note' | 'Todo';
  callback: () => any;
}) => {
  const [body, setBody] = useState('');
  const [isInvalid, setIsInvalid] = useState(false);

  const { colorMode } = useColorMode();

  const handleAddNote = () => {
    console.log('Add note');
    callback();
  };

  const handleAddTodo = () => {
    console.log('Add todo');
    callback();
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
      <FormControl isRequired isInvalid={isInvalid}>
        <Input
          placeholder={`Add ${type}...`}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          variant='filled'
        />
        {isInvalid && (
          <FormErrorMessage>{`${type} cannot be empty`}</FormErrorMessage>
        )}
      </FormControl>

      <IconButton
        aria-label={`Add ${type}`}
        icon={<Icon as={FaPlus} />}
        onClick={type === 'Note' ? handleAddNote : handleAddTodo}
        variant='ghost'
        colorScheme='green'
      />
    </HStack>
  );
};

export default AddItem;

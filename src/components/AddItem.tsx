import { useState, useRef } from 'react';
import {
  HStack,
  FormControl,
  Input,
  IconButton,
  Icon,
  useColorMode,
} from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa';

// Auth
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config';

// Firestore
import { db } from '../firebase/config';
import { collection, addDoc } from 'firebase/firestore';

const AddItem = ({ type }: { type: 'Note' | 'Todo' }) => {
  const [userId, setUserId] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  const { colorMode } = useColorMode();

  onAuthStateChanged(auth, (user) => {
    if (user) setUserId(user.uid);
  });

  const handleAddNote = async () => {
    const text = inputRef.current?.value;
    if (!text) return;

    const notesRef = collection(db, 'notes');
    await addDoc(notesRef, {
      body: text,
      uid: userId,
      createdAt: new Date().toISOString(),
    });
  };

  const handleAddTodo = async () => {
    const text = inputRef.current?.value;
    if (!text) return;

    const todosRef = collection(db, 'todos');
    await addDoc(todosRef, {
      body: text,
      uid: userId,
      completed: false,
      createdAt: new Date().toISOString(),
    });
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
      <FormControl isRequired>
        <Input placeholder={`Add ${type}...`} variant='filled' ref={inputRef} />
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

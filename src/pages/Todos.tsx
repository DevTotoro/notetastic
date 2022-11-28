import { useState, useEffect } from 'react';
import type { Todo as TodoType } from '../types';
import { VStack } from '@chakra-ui/react';
import Todo from '../components/Todo';
import AddItem from '../components/AddItem';

// Auth
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config';

// Firestore
import { db } from '../firebase/config';
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';

const Todos = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [userId, setUserId] = useState('');

  const todosRef = collection(db, 'todos');
  const q = query(
    todosRef,
    where('uid', '==', userId),
    orderBy('createdAt', 'desc')
  );

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const todosArray: TodoType[] = [];
    querySnapshot.forEach((doc) => {
      const todo = doc.data() as TodoType;
      todosArray.push({ ...todo, id: doc.id });
    });

    setTodos(todosArray);
  });

  onAuthStateChanged(auth, (user) => {
    if (user) setUserId(user.uid);
  });

  useEffect(() => {
    return unsubscribe();
  }, [userId]);

  return (
    <VStack w='100%'>
      <AddItem type='Todo' />

      {todos.map((todo) => (
        <Todo key={todo.id} {...todo} />
      ))}
    </VStack>
  );
};

export default Todos;

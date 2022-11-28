import { useState, useEffect } from 'react';
import type { Todo as TodoType } from '../types';
import { VStack } from '@chakra-ui/react';
import Todo from '../components/Todo';
import AddItem from '../components/AddItem';

const dummyTodos: TodoType[] = [
  {
    id: '1',
    body: 'This is a todo',
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    body: 'This is another todo',
    completed: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    body: 'This is a very long text that will 100% wrap. So this is a new line. And this is yet another line',
    completed: false,
    createdAt: new Date().toISOString(),
  },
];

const Todos = () => {
  const [todos, setTodos] = useState<TodoType[]>(dummyTodos);

  const fetchTodos = async () => {
    console.log('Fetch todos');
  };

  return (
    <VStack w='100%'>
      <AddItem type='Todo' callback={fetchTodos} />

      {todos.map((todo) => (
        <Todo key={todo.id} {...todo} />
      ))}
    </VStack>
  );
};

export default Todos;

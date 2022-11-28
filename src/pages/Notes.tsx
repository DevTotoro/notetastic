import type { Note as NoteType } from '../types';
import { VStack } from '@chakra-ui/react';
import Note from '../components/Note';

const dummyNotes: NoteType[] = [
  {
    id: '1',
    body: 'This is a note',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    body: 'This is another note',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    body: 'This is a third note with long text that will wrap',
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    body: 'This is a very long text that will 100% wrap. So this is a new line. And this is yet another line',
    createdAt: new Date().toISOString(),
  },
];

const Notes = () => {
  return (
    <VStack w='100%'>
      {dummyNotes.map((note) => (
        <Note key={note.id} {...note} />
      ))}
    </VStack>
  );
};

export default Notes;

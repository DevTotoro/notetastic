import { useState, useEffect } from 'react';
import type { Note as NoteType } from '../types';
import { VStack } from '@chakra-ui/react';
import Note from '../components/Note';
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
  getDocs,
  onSnapshot,
} from 'firebase/firestore';

const Notes = () => {
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [userId, setUserId] = useState('');

  const notesRef = collection(db, 'notes');
  const q = query(
    notesRef,
    where('uid', '==', userId),
    orderBy('createdAt', 'desc')
  );

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const notesArray: NoteType[] = [];
    querySnapshot.forEach((doc) => {
      const note = doc.data() as NoteType;
      notesArray.push({ ...note, id: doc.id });
    });

    setNotes(notesArray);
  });

  onAuthStateChanged(auth, (user) => {
    if (user) setUserId(user.uid);
  });

  useEffect(() => {
    return unsubscribe();
  }, [userId]);

  return (
    <VStack w='100%'>
      <AddItem type='Note' />

      {notes.map((note) => (
        <Note key={note.id} {...note} />
      ))}
    </VStack>
  );
};

export default Notes;

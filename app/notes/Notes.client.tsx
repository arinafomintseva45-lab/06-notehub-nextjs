'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import Link from 'next/link';
import type { Note } from '@/types/note';

export default function NotesClient() {
  const { data, isLoading, isError } = useQuery<Note[]>({
    queryKey: ['notes'],
    queryFn: fetchNotes,
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (isError) return <p>Could not fetch notes.</p>;

  return (
    <main>
      <h1>Notes</h1>

      {data?.map((note) => (
        <div key={note.id}>
          <h3>{note.title}</h3>
          <Link href={`/notes/${note.id}`}>View details</Link>
        </div>
      ))}
    </main>
  );
}
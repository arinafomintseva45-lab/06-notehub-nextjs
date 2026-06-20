'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNotes, Note } from '@/lib/api';
import Link from 'next/link';

export default function NotesClient() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', 1, ''],
    queryFn: () => fetchNotes(1, ''),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading notes</p>;

  const notes = data?.notes ?? [];

  return (
    <main>
      <h1>Notes</h1>

      {notes.map((note: Note) => (
        <div key={note.id}>
          <h2>{note.title}</h2>
          <p>{note.content}</p>

          <Link href={`/notes/${note.id}`}>
            View details
          </Link>
        </div>
      ))}
    </main>
  );
}
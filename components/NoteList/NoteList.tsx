import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Note } from "@/types/note";
import { deleteNote } from "@/lib/api";

interface Props {
  notes: Note[];
}

export default function NoteList({ notes }: Props) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  return (
    <ul>
      {notes.map((note) => (
        <li key={note.id}>
          <Link href={`/notes/${note.id}`}>
            {note.title}
          </Link>

          <button onClick={() => mutation.mutate(note.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import { Note } from "@/types/note";

import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import NoteList from "@/components/NoteList/NoteList";

function useDebounce(value: string, delay: number) {
  const [debounced, setDebounced] = useState(value);

  useState(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  });

  return debounced;
}

export default function NotesClient() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const debouncedSearch = useDebounce(search, 500);

  const { data } = useQuery({
    queryKey: ["notes", page, debouncedSearch],
    queryFn: () =>
      fetchNotes({ page, search: debouncedSearch }),
    placeholderData: (prev) => prev,
  });

  const notes: Note[] = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 1;

  return (
    <div>
      <SearchBox value={search} onChange={setSearch} />

      <button onClick={() => setIsOpen(true)}>
        Create note
      </button>

      <NoteList notes={notes} />

      <Pagination
        pageCount={totalPages}
        currentPage={page}
        onPageChange={setPage}
      />

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <NoteForm onSuccess={() => setIsOpen(false)} />
      </Modal>
    </div>
  );
}
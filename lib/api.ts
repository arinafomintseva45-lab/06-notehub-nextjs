import axios from 'axios';

const api = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});

export type Note = {
  id: string;
  title: string;
  content: string;
  tag: string;
  createdAt: string;
};

export type NotesResponse = {
  notes: Note[];
  total?: number;
};

export const fetchNotes = async (
  page: number = 1,
  search: string = ''
): Promise<NotesResponse> => {
  const res = await api.get('/notes', {
    params: {
      page,
      search,
    },
  });

  return res.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await api.get(`/notes/${id}`);
  return res.data;
};
export interface Note {
  id: string;
  title: string;
  content: string;
  tag: "work" | "personal" | "other";
  createdAt: string;
  updatedAt: string;
}
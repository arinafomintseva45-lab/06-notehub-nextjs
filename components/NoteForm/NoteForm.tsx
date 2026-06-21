import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api";

type NoteTag =
  | "Todo"
  | "Work"
  | "Personal"
  | "Meeting"
  | "Shopping";

interface FormValues {
  title: string;
  content: string;
  tag: NoteTag;
}

interface NoteFormProps {
  onClose?: () => void;
}

const schema = Yup.object({
  title: Yup.string().min(3).max(50).required(),
  content: Yup.string().max(500),
  tag: Yup.mixed<NoteTag>()
    .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"])
    .required(),
});

export default function NoteForm({ onClose }: NoteFormProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      onClose?.();
    },
  });

  return (
    <Formik<FormValues>
      initialValues={{
        title: "",
        content: "",
        tag: "Todo" as const,
      }}
      validationSchema={schema}
      onSubmit={(values) => mutation.mutate(values)}
    >
      <Form>
        <Field name="title" />
        <ErrorMessage name="title" />

        <Field as="textarea" name="content" />
        <ErrorMessage name="content" />

        <Field as="select" name="tag">
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </Field>

        <button type="button" onClick={onClose}>
          Cancel
        </button>

        <button type="submit">Create note</button>
      </Form>
    </Formik>
  );
}
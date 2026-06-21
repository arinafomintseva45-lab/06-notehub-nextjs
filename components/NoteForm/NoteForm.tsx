import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api";

interface Props {
  onSuccess?: () => void;
}

interface FormValues {
  title: string;
  content: string;
  tag: "work" | "personal" | "other";
}

const schema = Yup.object({
  title: Yup.string().required(),
  content: Yup.string().required(),
  tag: Yup.string().required(),
});

export default function NoteForm({ onSuccess }: Props) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      onSuccess?.();
    },
  });

  return (
    <Formik<FormValues>
      initialValues={{
        title: "",
        content: "",
        tag: "work",
      }}
      validationSchema={schema}
      onSubmit={(values) => mutation.mutate(values)}
    >
      <Form>
        <Field name="title" />
        <ErrorMessage name="title" />

        <Field name="content" />
        <ErrorMessage name="content" />

        <Field as="select" name="tag">
          <option value="work">work</option>
          <option value="personal">personal</option>
          <option value="other">other</option>
        </Field>

        <button type="submit">Save</button>
      </Form>
    </Formik>
  );
}
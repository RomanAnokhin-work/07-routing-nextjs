import { Field, Form, Formik, ErrorMessage, type FormikHelpers } from "formik";
import css from "./NoteForm.module.css";
import { useId } from "react";
import * as Yup from "yup";
import type { NoteTag } from "../../types/note";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api";

const NoteFormSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title must be at most 50 characters")
    .required("Title is required"),
  content: Yup.string().max(500, "Content must be at most 500 characters"),
  tag: Yup.string()
    .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"], "Invalid tag")
    .required("Tag is required"),
});

interface NoteFormProps {
  onClose: () => void;
}

interface CreateNoteRequest {
  title: string;
  content: string;
  tag: NoteTag;
}

function NoteForm({ onClose }: NoteFormProps) {
  const fieldId = useId();
  const queryClient = useQueryClient();

  const initialValues: CreateNoteRequest = {
    title: "",
    content: "",
    tag: "Todo",
  };

  const createMutation = useMutation({
    mutationFn: (note: CreateNoteRequest) => createNote(note),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      onClose();
    },
  });

  const handleSubmit = (
    note: CreateNoteRequest,
    actions: FormikHelpers<CreateNoteRequest>,
  ) => {
    createMutation.mutate(note);
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={NoteFormSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <fieldset className={css.formGroup}>
          <label htmlFor={`${fieldId}-title`}>Title</label>
          <Field
            id={`${fieldId}-title`}
            type="text"
            name="title"
            className={css.input}
          />
          <ErrorMessage name="title" component="span" className={css.error} />
        </fieldset>

        <fieldset className={css.formGroup}>
          <label htmlFor={`${fieldId}-content`}>Content</label>
          <Field
            as="textarea"
            id={`${fieldId}-content`}
            name="content"
            rows={8}
            className={css.textarea}
          />
          <ErrorMessage name="content" component="span" className={css.error} />
        </fieldset>

        <fieldset className={css.formGroup}>
          <label htmlFor={`${fieldId}-tag`}>Tag</label>
          <Field
            as="select"
            id={`${fieldId}-tag`}
            name="tag"
            className={css.select}
          >
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage name="tag" component="span" className={css.error} />
        </fieldset>

        <fieldset className={css.actions}>
          <button type="button" className={css.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={false}>
            Create note
          </button>
        </fieldset>
      </Form>
    </Formik>
  );
}

export default NoteForm;

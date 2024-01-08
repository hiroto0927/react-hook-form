/* eslint-disable react-hooks/exhaustive-deps */
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TPropsEmailSchema, emailSchema } from "./schema";
import { useCallback } from "react";

export default function useSubmitForm() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TPropsEmailSchema>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      emails: [{ email: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "emails",
  });

  const onSubmit = (data: TPropsEmailSchema) => alert(JSON.stringify(data));

  const addEmail = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      append({ email: "" });
    },
    []
  );

  const removeEmail = useCallback((index: number) => {
    remove(index);
  }, []);

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    addEmail,
    removeEmail,
    fields,
  };
}

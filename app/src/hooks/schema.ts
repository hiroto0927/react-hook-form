import * as z from "zod";

export const emailSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: "名前は必須です。" })
      .max(50, { message: "名前は50文字以内で入力してください。" }),
    emails: z
      .object({
        email: z
          .string()
          .min(1, { message: "メールアドレスは必須です。" })
          .email({ message: "メールアドレスが正しくありません。" }),
      })
      .array(),
  })
  .superRefine((value, ctx) => {
    ConflictValidateCheck({ array: value.emails }).forEach((index) => {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "メールアドレスが重複しています。",
        path: ["emails", index, "email"],
      });
    });
  });

export type TPropsEmailSchema = z.infer<typeof emailSchema>;

export const ConflictValidateCheck = ({
  array,
}: {
  array: { email: string }[];
}) => {
  const duplicateIndexes: string[] = [];
  const emailArray: string[] = [];

  array.forEach((item, index) => {
    if (emailArray.includes(item.email)) {
      duplicateIndexes.push(index.toString());
    } else {
      emailArray.push(item.email);
    }
  });

  return duplicateIndexes;
};

"use client";
import SubmitButton from "@/components/ui-elements/button/blue-button";
import MinusButton from "@/components/ui-elements/button/minus-button";
import PlusButton from "@/components/ui-elements/button/plus-button";
import EmailForm from "@/components/ui-elements/forms/email-form";
import useSubmitForm from "@/hooks/submit-form";

export default function Home() {
  const {
    fields,
    register,
    onSubmit,
    handleSubmit,
    addEmail,
    removeEmail,
    errors,
  } = useSubmitForm();
  return (
    <main className="flex h-screen w-full items-center p-40 bg-slate-200">
      <form className="space-y-5 w-full" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="flex gap-5">
            <p className="shrink-0">お名前</p>
            <input
              type="text"
              className="w-full outline-none p-1"
              {...register("name")}
            />
          </div>
          {errors.name && (
            <p className="text-red-500">{errors.name?.message}</p>
          )}
        </div>
        {fields.map((field, index) => {
          return (
            <div key={field.id}>
              <div className="flex gap-5">
                <EmailForm
                  register={register(`emails.${index}.email` as const)}
                />
                <PlusButton onClick={addEmail} />
                {fields.length > 1 && (
                  <MinusButton
                    onClick={(e) => {
                      e.preventDefault();
                      removeEmail(index);
                    }}
                  />
                )}
              </div>
              {errors.emails?.[index]?.email && (
                <p className="text-red-500">
                  {errors.emails?.[index]?.email?.message}
                </p>
              )}
            </div>
          );
        })}
        <SubmitButton />
      </form>
    </main>
  );
}

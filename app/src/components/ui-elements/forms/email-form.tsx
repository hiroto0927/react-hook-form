type TPropsEmailForm = {
  register?: JSX.IntrinsicElements["input"];
};

export default function EmailForm(props: TPropsEmailForm) {
  return (
    <div className="w-full flex gap-3 items-center">
      <p className="shrink-0">メールアドレス</p>
      <input
        type="email"
        className="w-full outline-none p-1"
        {...props.register}
      />
    </div>
  );
}

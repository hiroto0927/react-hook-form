export default function MinusButton(props: {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      className="size-10 bg-blue-400 hover:bg-blue-600 text-white rounded-md duration-700"
      onClick={props.onClick}
    >
      -
    </button>
  );
}

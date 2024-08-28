interface IErrorMessage {
  msg: string;
}

export default function ErrorMessage({ msg }: IErrorMessage) {
  return (
    <>
      {msg ? (
        <span className="block text-red-700 font-semibold text-sm">{msg}</span>
      ) : null}
    </>
  );
}


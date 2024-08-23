import { InputHTMLAttributes } from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IInput extends InputHTMLAttributes<HTMLInputElement> {}

export default function Input({ ...rest }: IInput) {
  return (
    <>
      <input
        className="border-[1px] border-gray-300 focus:outline-none shadow-md focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-md p-3 text-md"
        {...rest}
      />
    </>
  );
}

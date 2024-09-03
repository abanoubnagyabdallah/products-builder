import { HTMLAttributes } from "react";

interface IColor extends HTMLAttributes<HTMLSpanElement> {
  color: string;
}

export default function ProductColors({color,...rest}:IColor) {
  return (
    <>
      <span
        className={`w-5 h-5 rounded-full  cursor-pointer block`}
        style={{ backgroundColor: `${color}` }}
        {...rest}
      ></span>
    </>
  );
}

import React from "react";

interface MyButtonProps {
  text: string;
  age?: number;
  email?: string;
}

export const Button: React.FC<MyButtonProps> = (props) => {
  return (
    <button className=" bg-white rounded-md w-8">
      <span className=" text-gray-900 p-3 py-6 ">{props.text || "Text"}</span>
    </button>
  );
};

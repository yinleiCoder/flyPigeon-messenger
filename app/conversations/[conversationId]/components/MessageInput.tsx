"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface MessageInputProps {
  id: string;
  register: UseFormRegister<FieldValues>;
  type?: string;
  errors: FieldErrors;
  required?: boolean;
  placeholder?: string;
}

function MessageInput({
  id,
  register,
  type,
  errors,
  required,
  placeholder,
}: MessageInputProps) {
  return (
    <div className="relative w-full">
      <input
        id={id}
        type={type}
        autoComplete={id}
        placeholder={placeholder}
        {...register(id, { required })}
        className="text-black font-light py-2 px-4 bg-neutral-100 w-full rounded-full focus:outline-none"
      />
    </div>
  );
}

export default MessageInput;

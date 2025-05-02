import { RegisterOptions, UseFormRegister } from "react-hook-form";

interface InputProps {
  type: string;
  name: string;
  placeholder: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  error?: string;
  rules?: RegisterOptions;
}

export function Input({
  type,
  name,
  placeholder,
  error,
  register,
  rules,
}: InputProps) {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        className="border-1 border-gray-200 rounded-md w-full h-10 p-2 outline-none focus:outline focus:border-gray-500"
        {...register(name, rules)}
        id={name}
      />

      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}

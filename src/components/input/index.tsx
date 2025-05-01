interface InputProps {
  type: string;
  name: string;
  placeholder: string;
}

export function Input({ type, name, placeholder }: InputProps) {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        className="border-1 border-gray-200 rounded-md w-full h-10 p-2 outline-none focus:outline focus:border-gray-500"
      />
    </div>
  );
}

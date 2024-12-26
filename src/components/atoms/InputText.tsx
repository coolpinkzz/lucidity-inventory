import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  error?: string;
}

const InputText: React.FC<InputProps> = ({ label, name, error, ...props }) => {
  if (error) {
    console.log(error);
  }
  return (
    <div className="mb-4 w-full">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-200 mb-1"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        className={`w-full bg-[#434441] border ${
          error ? "border-red-500" : "border-gray-600"
        } text-white rounded px-3 py-2 focus:outline-none focus:ring-2 ${
          error ? "focus:ring-red-500" : "focus:ring-green-500"
        }`}
        {...props}
      />
      {error && <p className="text-rose-300 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default InputText;

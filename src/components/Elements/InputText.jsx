import React from "react";

function InputText({ label, type, name, formName, onChange, placeholder, value }) {
  return (
    <>
      <label className="text-xs text-black font-semibold">{label}</label>
      <input
        type={type}
        className="bg-transparent border py-1 px-2 input-none border-gray-400 text-black text-sm rounded w-full placeholder:text-gray-300"
        name={name}
        form={formName}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
      />
    </>
  );
}

export default InputText;

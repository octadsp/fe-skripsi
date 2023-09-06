import React from "react";

function InputText(props) {
  return (
    <>
      <label className="text-base text-black font-semibold">{props.label}</label>
      <input
        type={props.type}
        className="bg-transparent border py-1 px-2 input-none border-gray-400 text-black text-base rounded w-full placeholder:text-gray-300"
        name={props.name}
        form={props.formName}
        // onChange={handleOnChange}
        // value={email}
        placeholder={props.placeholder}
      />
    </>
  );
}

export default InputText;

import React, { useState, useEffect } from "react";

function InputFormReservation({
  label,
  type,
  placeholder,
  value,
  disabled,
  onChange,
  name,
}) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-navBg text-sm">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={onChange}
        name={name}
        className="bg-white rounded-md p-2 border border-light-silver shadow text-navBg"
      ></input>
    </div>
  );
}

export default InputFormReservation;

import React from "react";

function InputFormReservation({ label, type, placeholder }) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-navBg text-sm">{label}</label>
      <input type={type} placeholder={placeholder} className="bg-white rounded-md p-2 border border-light-silver shadow text-navBg"></input>
    </div>
  );
}

export default InputFormReservation;

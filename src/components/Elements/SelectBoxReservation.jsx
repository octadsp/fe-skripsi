import React from "react";

function SelectBoxReservation({ label }) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-sm text-navBg">{label}</label>
      <select className="bg-white text-navBg rounded-md p-2 border border-light-silver shadow">
        {/* {dataType?.map((item, index) => (
            <option >{item.type}</option>
        ))} */}
        <option disabled selected hidden>Choose your option...</option>
        <option>Testing 1</option>
        <option>Testing 2</option>
      </select>
    </div>
  );
}

export default SelectBoxReservation;

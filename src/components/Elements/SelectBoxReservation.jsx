import React from "react";

function SelectBoxReservation({ label, lists, onChange }) {
  const handleSelectChange = (e) => {
    onChange && onChange(e.target.value);
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-sm text-navBg">{label}</label>
      <select
        onChange={handleSelectChange}
        className="bg-white text-navBg rounded-md p-2 border border-light-silver shadow"
      >
        <option disabled selected hidden>
          Choose your option...
        </option>
        {lists?.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectBoxReservation;

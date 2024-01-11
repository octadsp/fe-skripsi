import React from "react";

function Collapse(props) {
  return (
    <div
      tabIndex={0}
      className="collapse text-navBg collapse-arrow bg-light-gray"
    >
      <input type="checkbox" />
      <div className="collapse-title text-lg font-medium">{props.title}</div>
      <div className="collapse-content">
        <p>{props.content}</p>
      </div>
    </div>
  );
}

export default Collapse;

import React from "react";

const Input = (props) => {
  return (
    // <input type="text"  placeholder="notes" className="border-none bg-transparent outline-none"/>
    <div
    contentEditable={true}
    className="border-none bg-transparent outline-none text-gray-500 text-sm"
    style={{ cursor: "text" }}
    onInput={props.onInput}
  >
    Notes
  </div>
  );
};

export default Input;

import React from "react";

function Text({ text }) {
  return (
    <div className="flex text-center items-center">
      <p className="text-white font-Roboto text-xl">{text}</p>
    </div>
  );
}

export default Text;

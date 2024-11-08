import React from "react";

function Image({ image, text }) {
  return (
    <div className="flex flex-col p-4">
      <div>
        <img src={image} alt={text} />
      </div>
    </div>
  );
}

export default Image;

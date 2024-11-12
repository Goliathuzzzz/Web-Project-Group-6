import React from "react";
import arrow from "../../assets/images/arrow_right.png";

function Process({ id, image, text }) {
  const arrowImg = arrow;

  return (
    <div className="flex flex-col items-center sm:flex-row my-2">
      <div className="flex text-center items-center max-w-48">
        <p className="text-white font-Roboto text-xl">{text}</p>
      </div>
      <div className="flex flex-col">
        <img src={image} alt={text} />
      </div>
      {id !== 4 && (
        <div className="flex items-center justify-center rotate-90 sm:rotate-0">
          <img src={arrowImg} alt="Arrow" id="arrow-image" />
        </div>
      )}
    </div>
  );
}

export default Process;

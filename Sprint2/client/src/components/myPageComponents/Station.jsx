import React from "react";
import selGreen from "../../assets/images/selected_green.png";
import blueX from "../../assets/images/blue_x.png";

function Station({ name, removeStation }) {
  return (
    <div className="flex items-center">
      <h3 className="font-Roboto text-xs text-white p-1 pl-0">{name}</h3>
      <img src={selGreen} alt="Selected" className="w-4 h-4" />
      <img
        src={blueX}
        alt="Remove"
        className="w-4 h-4 cursor-pointer transform transition-transform duration-200 hover:scale-125"
        onClick={removeStation}
      />
    </div>
  );
}

export default Station;

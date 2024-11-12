import React from "react";
import selGreen from "../../assets/images/selected_green.png";
import blueX from "../../assets/images/blue_x.png";

function Station({ name }) {
  return (
    <div className="flex items-center">
      <h3 className="font-Roboto text-lg text-white p-1">{name}</h3>
      <img src={selGreen} alt="Selected" className="w-6 h-6" />
      <img src={blueX} alt="X" className="w-6 h-6" />
    </div>
  );
}

export default Station;

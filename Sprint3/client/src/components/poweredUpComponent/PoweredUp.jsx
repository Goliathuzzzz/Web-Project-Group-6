import React from "react";
import lightning from "../../assets/images/lightning_pic2.png";

function PowerUp() {
  return (
    <div className="flex bg-gradient-to-r from-mediumGreen to-purplish w-full text-center justify-center items-center py-2 my-9 tracking-wide">
      <img src={lightning} alt="Lightning" className="w-10 h-10"/>
      <h2 className="text-white font-Orbitron text-xl">
        Stay Powered Up with Real-Time Updates
      </h2>
      <img src={lightning} alt="Lightning" className="w-10 h-10" />
    </div>
  );
}

export default PowerUp;

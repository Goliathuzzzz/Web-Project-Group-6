import React from "react";
import lightning from "../../assets/images/lightning.png";

function PowerUp() {
  return (
    <div className="flex bg-gradient-to-r from-mediumGreen to-purplish w-full text-center justify-center items-center my-12 rounded-md tracking-wide">
      <img src={lightning} alt="Lightning" />
      <h2 className="text-white font-Orbitron text-xl">
        Stay Powered Up with Real-Time Updates
      </h2>
      <img src={lightning} alt="Lightning" />
    </div>
  );
}

export default PowerUp;

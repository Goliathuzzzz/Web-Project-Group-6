import React from "react";

function CallToAction() {
  return (
    <div className="flex justify-center w-full rounded-md">
      <div className="flex flex-col items-center justify-center bg-ctaBg bg-cover w-[70%]">
        <h2 className="text-electricBlue text-2xl tracking-wider w-full text-center p-2 mt-10 font-Orbitron">
          Map Out Your Next Charge in Seconds
        </h2>
        <div className="text-white text-center text-lg my-2 font-Roboto">
          <p>Discover fast and reliable charging points near you. </p>
          <p>
            Open the map and drive with{" "}
            <span className="text-eGreen italic">confidence.</span>
          </p>
        </div>

        <button className="bg-ctaYellow py-3 mt-4 mb-10 px-5 font-Roboto font-bold rounded-xl">
          Open the Map
        </button>
      </div>
    </div>
  );
}

export default CallToAction;

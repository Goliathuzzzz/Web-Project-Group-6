import React from "react";
import heroImg from "../assets/images/hero_section.png";

function Hero() {
  return (
    /* Hero container */
    <div className="flex flex-col lg:flex-row max-w-screen-2xl">
      {/* Main hero component */}
      <div className="flex flex-col bg-herocar bg-cover h-80 lg:w-[60%]">
        {/* Main title container */}
        <div className="flex bg-opacity-70 py-4 bg-heroTitleBg">
          <h2 className="text-4xl ml-24 font-bold">
            <span className="text-white">Find. Charge.</span>{" "}
            <span className="text-eGreen">Go Green.</span>
          </h2>
        </div>
        {/* Arrow buttons container */}
        <div className="flex justify-between mx-auto h-1/2">
          {/* Arrow button container */}
          <div className="flex justify-content items-center"></div>
        </div>
        {/* Sign up button container*/}
        <div className="flex justify-start">
          <button className="ml-24 bg-eGreen pt-2 pb-3 px-12 rounded-lg hover:bg-darkGreen hover:text-white transition duration-500 font-bold text-2xl">
            Sign Up Here
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hero;

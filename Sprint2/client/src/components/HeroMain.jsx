import React from "react";

function HeroMain() {
  return (
    <>
      {/* Main hero component */}
      <div className="flex flex-col bg-herocar bg-cover h-80 md:w-[60%]">
        {/* Main title container */}
        <div className="flex bg-opacity-70 py-4 bg-heroTitleBg text-center md:text-left">
          <h2 className="text-4xl md:ml-24 font-medium font-Orbitron tracking-wider w-full">
            <span className="text-white">Find. Charge.</span>{" "}
            <span className="text-eGreen">Go Green.</span>
          </h2>
        </div>
        {/* Arrow buttons container */}
        <div className="flex justify-between mx-auto h-[52%]">
          {/* Arrow button container */}
          <div className="flex justify-content items-center"></div>
        </div>
        {/* Sign up button container*/}
        <div className="flex mx-auto md:justify-start md:mx-0 mb-12">
          <button className="md:ml-24 bg-eGreen py-2 px-12 rounded-lg hover:bg-darkGreen hover:text-white transition duration-500 font-bold text-2xl font-Roboto">
            Sign Up Here
          </button>
        </div>
      </div>
    </>
  );
}

export default HeroMain;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import ArrowLeft from "../../assets/images/expand_left_2.png";
import ArrowRight from "../../assets/images/expand_right_2.png";
import HeroCar from "../../assets/images/hero_car.png";
import HeroFind from "../../assets/images/hero_locate.png";
import HeroCharge from "../../assets/images/hero_charge.png";
import HeroGreen from "../../assets/images/hero_green.png";

function HeroMain() {
  const bgImages = [HeroCar, HeroFind, HeroCharge, HeroGreen];

  const titles = [
    { main: "Find.", secondary: "Charge. Go Green." },
    { main: "Discover.", secondary: "New Adventures." },
    { main: "Charge.", secondary: "Anywhere, Anytime." },
    { main: "Go Green.", secondary: "For a Better Future." },
  ];

  const bgPositionByIndex = [
    "right 15% center",
    "left 10% top 20%",
    "right 15% center",
    "left 5% bottom 10%",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleLeftClick = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + bgImages.length) % bgImages.length
    );
  };

  const handleRightClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % bgImages.length);
  };

  return (
    <>
      {/* Main hero component */}
      <div
        className="flex flex-col bg-cover h-80 md:w-[60%]"
        style={{
          backgroundImage: `url(${bgImages[currentIndex]})`,
          backgroundPosition: bgPositionByIndex[currentIndex],
        }}
      >
        {/* Main title container */}
        <div className="flex bg-opacity-70 py-4 bg-heroTitleBg text-center md:text-left">
          <h2 className="text-4xl md:ml-24 font-medium font-Orbitron tracking-wider w-full">
            <span className="text-white">{titles[currentIndex].main}</span>{" "}
            <span className="text-eGreen">
              {titles[currentIndex].secondary}
            </span>
          </h2>
        </div>

        {/* Arrow buttons container */}
        <div className="flex justify-between items-center h-full">
          {/* Left arrow */}
          <button
            onClick={handleLeftClick}
            className="ml-10 hover:bg-eGreen transition duration-300 p-2 rounded-full"
          >
            <img src={ArrowLeft} alt="Left Arrow" className="h-10 w-10" />
          </button>

          {/* Spacer */}
          <div className="flex-1"></div>

          {/* Right arrow */}
          <button
            onClick={handleRightClick}
            className="mr-10 hover:bg-eGreen transition duration-300 p-2 rounded-full"
          >
            <img src={ArrowRight} alt="Right Arrow" className="h-10 w-10" />
          </button>
        </div>

        {/* Sign up button container */}
        <div className="flex mx-auto md:justify-start md:mx-0 mb-12">
          <Link
            to="/registration"
            className="md:ml-24 bg-eGreen py-2 px-12 rounded-lg hover:bg-darkGreen hover:text-white transition duration-500 font-bold text-2xl font-Roboto"
          >
            Sign Up Here
          </Link>
        </div>
      </div>
    </>
  );
}

export default HeroMain;

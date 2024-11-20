import HeroMain from "./HeroMain";
import React from "react";
import HeroMap from "./HeroMap";

function Hero() {
  return (
    <>
      <div className="flex flex-col md:flex-row max-w-screen-2xl">
        <HeroMain />
        <HeroMap />
      </div>
    </>
  );
}

export default Hero;
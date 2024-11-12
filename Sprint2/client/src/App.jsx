import React from "react";
import Hero from "./components/heroComponents/Hero";
import ProcessList from "./components/processComponents/ProcessList";
import ReviewList from "./components/ReviewComponents/ReviewList";
import Calculator from "./components/CalculatorComponents/Calculator";
import PowerUp from "./components/poweredUpComponent/PoweredUp";

/* Placeholder code for testing */
function App() {
  return (
    <>
      <div className="max-w-screen-2xl m-auto bg-darkerBlue mix-blend-normal">
        <Hero />
        <ProcessList />
        <div className="flex flex-col md:flex-row md:justify-between">
          <ReviewList />
          <Calculator />
        </div>
        <PowerUp />
      </div>
    </>
  );
}

export default App;

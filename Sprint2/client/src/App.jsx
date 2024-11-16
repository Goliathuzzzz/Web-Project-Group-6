import React from "react";
import Hero from "./components/heroComponents/Hero";
import Login from "./components/Login";
import ProcessList from "./components/processComponents/ProcessList";
import ReviewList from "./components/ReviewComponents/ReviewList";
import Calculator from "./components/CalculatorComponents/Calculator";
import PowerUp from "./components/poweredUpComponent/PoweredUp";
import CallToAction from "./components/callToActionComponent/CallToAction";
import Map from "./components/Map";
import stations from "../../server/mock-data/ev_stations_mock_data.json";

/* Placeholder code for testing */
function App() {
  return (
    <>
      <div className="max-w-screen-2xl m-auto bg-darkerBlue mix-blend-normal">
        <Login />
        <Hero />
        <ProcessList />
        <div className="flex flex-col md:flex-row md:justify-between">
          <ReviewList />
          <Calculator />
        </div>
        <PowerUp />
        <CallToAction />
      </div>
    </>
  );
}

export default App;

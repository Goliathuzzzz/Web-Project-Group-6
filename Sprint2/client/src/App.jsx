import React from "react";
import Hero from "./components/heroComponents/Hero";
import NavBar from "./components/navBarComponents/NavBar";
import Footer from "./components/footerComponents/Footer";
import ProfilePic from "./assets/images/reviewer_2.png";
import Specifications from "./components/myPageBottomComponents/Specifications";
import Login from "./components/Login";
import ProcessList from "./components/processComponents/ProcessList";
import ReviewList from "./components/ReviewComponents/ReviewList";
import Calculator from "./components/CalculatorComponents/Calculator";
import PowerUp from "./components/poweredUpComponent/PoweredUp";
import CallToAction from "./components/callToActionComponent/CallToAction";

/* Placeholder code for testing */
function App() {
  return (
    <>
      <div className="max-w-screen-2xl m-auto bg-homepage bg-cover">
        <NavBar profilePicture={ProfilePic} />
        <Login />
        <Hero />
        {/*<Hero />*/}
        <Specifications />
        <ProcessList />
        <div className="flex flex-col md:flex-row md:justify-between">
          <ReviewList />
          <Calculator />
        </div>
        <PowerUp />
        <CallToAction />
        <Footer />
      </div>
    </>
  );
}

export default App;

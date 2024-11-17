import React from "react";
import Hero from "./components/heroComponents/Hero";
import Footer from "./components/footerComponents/Footer";
import Specifications from "./components/myPageBottomComponents/Specifications";
import Login from "./components/loginComponents/Login";
import ProcessList from "./components/processComponents/ProcessList";
import ReviewList from "./components/ReviewComponents/ReviewList";
import Calculator from "./components/CalculatorComponents/Calculator";
import PowerUp from "./components/poweredUpComponent/PoweredUp";
import CallToAction from "./components/callToActionComponent/CallToAction";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import ProfilePic from "./components/myPageTopComponents/ProfilePic";
import SavedStations from "./components/myPageTopComponents/SavedStations";
import GLogin from "./components/loginComponents/GoogleLogin";

/* Placeholder code for testing */
function App() {
  return (
    <div className="max-w-screen-2xl m-auto bg-homepage bg-cover">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                <>
                  <Hero />
                  <ProcessList />
                  <div className="flex flex-col md:flex-row md:justify-between">
                    <ReviewList />
                    <Calculator />
                  </div>
                  <PowerUp />
                  <CallToAction />
                </>
              }
            />
            <Route path="login" element={<Login />} />
            <Route
              path="dashboard"
              element={
                <>
                  <div className="flex flex-col md:flex-row md:justify-center md:gap-7">
                    <ProfilePic />
                    <SavedStations />
                  </div>
                  <Specifications />
                </>
              }
            />
            <Route path="about" element={<>{/* Placeholder element */}</>} />
            <Route path="map" element={<>{/* Placeholder element */}</>} />
            <Route
              path="registration"
              element={<>{/* Placeholder element */}</>}
            />{" "}
            <Route path="googlelogin" element={<GLogin />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

<<<<<<< HEAD
import React from "react";
import Hero from "./components/heroComponents/Hero";
import Specifications from "./components/myPageComponents/Specifications";
import Login from "./components/loginComponents/Login";
import Register from "./components/registerComponents/Register";
import ProcessList from "./components/processComponents/ProcessList";
import ReviewList from "./components/ReviewComponents/ReviewList";
import Calculator from "./components/CalculatorComponents/Calculator";
import PowerUp from "./components/poweredUpComponent/PoweredUp";
import CallToAction from "./components/callToActionComponent/CallToAction";
import Map from "./components/mapComponents/Map";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import ProfilePic from "./components/myPageComponents/ProfilePic";
import SavedStations from "./components/myPageComponents/SavedStations";
import AuthProvider from "../routes/AuthProvider";
import PrivateRoute from "../routes/PrivateRoute";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AboutUs from "./components/aboutUsComponents/AboutUs";
import ContactUs from "./components/contactComponents/ContactUs";
import Legal from "./components/legalComponents/Legal";
import { FilterDataProvider } from "../routes/FilterDataContext";
=======
import React, { useContext } from 'react';
import Hero from './components/heroComponents/Hero';
import Footer from './components/footerComponents/Footer';
import Specifications from './components/myPageComponents/Specifications';
import Login from './components/loginComponents/Login';
import Register from './components/registerComponents/Register';
import ProcessList from './components/processComponents/ProcessList';
import ReviewList from './components/ReviewComponents/ReviewList';
import Calculator from './components/CalculatorComponents/Calculator';
import PowerUp from './components/poweredUpComponent/PoweredUp';
import CallToAction from './components/callToActionComponent/CallToAction';
import Map from './components/mapComponents/Map';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import ProfilePic from './components/myPageComponents/ProfilePic';
import SavedStations from './components/myPageComponents/SavedStations';
import AuthProvider from '../routes/AuthProvider';
import { GoogleOAuthProvider } from '@react-oauth/google';
import AboutUs from './components/aboutUsComponents/AboutUs';
import ContactUs from './components/contactComponents/ContactUs';
import Legal from './components/legalComponents/Legal';
import ProtectedRoute from './components/ProtectedRoute';
import AdminContactForms from './components/contactComponents/AdminContactForms';
>>>>>>> heta

/* Placeholder code for testing */
function App() {
  return (
    <div className="max-w-screen-2xl m-auto bg-homepage bg-cover">
      <BrowserRouter>
        <GoogleOAuthProvider
          clientId={import.meta.env.VITE_REACT_APP_GOOGLE_CLIENT_ID}
        >
          <AuthProvider>
<<<<<<< HEAD
            <FilterDataProvider>
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
                  <Route path="about-us" element={<AboutUs />} />
                  <Route path="login" element={<Login />} />
                  <Route path="contact" element={<ContactUs />} />
                  <Route path="legal" element={<Legal />} />
                  <Route path="login" element={<Login />} />
                  <Route
                    path="dashboard"
                    element={
                      <>
                        <div className="flex flex-col my-page:flex-row justify-center my-page:gap-5 mb-2">
                          <ProfilePic />
                          <SavedStations />
                        </div>
                        <Specifications />
                      </>
                    }
                  />
                  <Route
                    path="about"
                    element={<>{/* Placeholder element */}</>}
                  />
                  <Route path="map" element={<Map />} />
                  <Route path="registration" element={<Register />} />
                </Route>
              </Routes>
            </FilterDataProvider>
=======
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
                <Route path="about-us" element={<AboutUs />} />
                <Route path="login" element={<Login />} />
                <Route path="contact" element={<ContactUs />} />
                <Route path="legal" element={<Legal />} />
                <Route path="login" element={<Login />} />
                {/* admin route for contact forms */}
                <Route
                  path="admin-forms"
                  element={
                    <ProtectedRoute>
                      <AdminContactForms />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="dashboard"
                  element={
                    <>
                      <div className="flex flex-col my-page:flex-row justify-center my-page:gap-5">
                        <ProfilePic />
                        <SavedStations />
                      </div>
                      <Specifications />
                    </>
                  }
                />
                <Route path="map" element={<Map />} />
                <Route path="registration" element={<Register />} />
              </Route>
            </Routes>
>>>>>>> heta
          </AuthProvider>
        </GoogleOAuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

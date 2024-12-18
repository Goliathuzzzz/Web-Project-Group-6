import React, { useEffect, useState } from "react";
import Car from "../../assets/images/tesla_car.png";
import Charger from "../../assets/images/Tesla.png";
import { chargerTypes, chargerPowers, serviceProviders } from "./selectOptions";
import { reviews } from "./reviews";

function Specifications() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("Helsinki");

  useEffect(() => {
    const storedProfile = localStorage.getItem("profile");
    if (storedProfile) {
      const profile = JSON.parse(storedProfile);
      setName(profile.name);
      setEmail(profile.email);
    }
  }, []);

  return (
    <div className="flex flex-col lg:flex-row justify-center gap-4 lg:gap-7 p-4">
      {/* Main specifications section */}
      <div className="flex flex-col main-spec:flex-row bg-gradient-to-b from-darkerBlue to-darkBlue rounded-sm gap-4 p-4 w-fit mx-auto lg:mx-0">
        {/* Left side car spec and filters */}
        <div className="flex flex-col space-y-4">
          <div className="p-5 text-left text-white bg-myPageBlue rounded-sm">
            <h1 className="text-base font-Orbitron">Tesla</h1>
            <h2 className="text-base font-Orbitron">Model Y</h2>
            <img
              src={Charger}
              alt="Tesla Charger"
              className="h-10 max-w-xs ml-2 mt-1"
            />
          </div>

          {/* Map filters section */}
          <div className="text-base font-Orbitron text-white bg-myPageBlue p-4 pb-20 rounded-sm h-full">
            <h3 className="mb-2 text-salmonRed">Map Filters</h3>

            <div className="mb-4">
              <label className="block mb-1">Charger Type</label>
              <select className="w-full p-2 bg-mediumBlue text-white rounded-sm bg-no-repeat bg-[calc(100%-1rem)_center] bg-[length:1.25rem_1.25rem] bg-dropdownArrow appearance-none hover:bg-myPageBlue hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500">
                {chargerTypes.map((type, index) => (
                  <option key={index}>{type}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block mb-1">Charger Power (kW)</label>
              <select className="w-full p-2 bg-mediumBlue text-white rounded-sm bg-no-repeat bg-[calc(100%-1rem)_center] bg-[length:1.25rem_1.25rem] bg-dropdownArrow appearance-none hover:bg-myPageBlue hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500">
                {chargerPowers.map((power, index) => (
                  <option key={index}>{power}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1">Service Provider</label>
              <select className="w-full p-2 bg-mediumBlue text-white rounded-sm bg-no-repeat bg-[calc(100%-1rem)_center] bg-[length:1.25rem_1.25rem] bg-dropdownArrow appearance-none hover:bg-myPageBlue hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500">
                {serviceProviders.map((provider, index) => (
                  <option key={index}>{provider}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Right side car image */}
        <div className="bg-myPageBlue pb-20 flex justify-center">
          <img src={Car} alt="Tesla Model X" className="h-auto w-60" />
        </div>
      </div>

      {/* Reviews and profile Section */}
      <div className="flex flex-col gap-4 lg:items-start items-center">
        {/* Reviews section */}
        <div className="bg-gradient-to-b from-darkerBlue to-darkBlue text-white rounded-sm p-4 w-80 h-96 overflow-y-scroll">
          <h2 className="p-3 text-lg font-Orbitron mb-4 bg-myPageBlue text-eGreen rounded-sm pl-4">
            My Reviews
          </h2>
          <div className="space-y-4">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="p-3 pl-4 bg-myPageBlue rounded-sm h-24 overflow-y-scroll scrollbar-thin scrollbar-thumb-darkBlue scrollbar-track-mediumBlue"
              >
                <p className="text-sm">"{review.text}"</p>
                <span className="text-xs">- {review.reviewer}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Profile section */}
        <div className="bg-gradient-to-b from-darkerBlue to-darkBlue text-white rounded-sm px-4 py-3 w-80">
          <h3 className="text-base font-Orbitron mb-1 font-bold pl-1">
            Profile Information
          </h3>
          <div className="space-y-0.5 bg-myPageBlue p-3 rounded-sm">
            <div>
              <span className="font-bold text-base font-Roboto">Name </span>
              <span className="ml-3 text-xs font-Roboto">{name}</span>
            </div>
            <div>
              <span className="font-bold font-Roboto">Email </span>
              <span className="ml-3 text-xs">{email}</span>
            </div>
            <div>
              <span className="font-bold font-Roboto">Location </span>
              <span className="ml-3 text-xs ">{location}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Specifications;

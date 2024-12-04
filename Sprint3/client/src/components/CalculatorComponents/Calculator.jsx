import React from "react";
import { useState } from "react";
import logo from "../../assets/images/logo_no_bg.png";

function Calculator() {
  const [manufacturer, setManu] = useState("");
  const [power, setPower] = useState("");
  const [model, setModel] = useState("");
  const [cost, setCost] = useState("");

  return (
    <div className="relative ml-10 md:ml-0 mr-10 lg:ml-0 md:mr-10 mt-8 md:mt-0 rounded-md shadow-xl shadow-lightGreen lg:w-calculatorWidth overflow-hidden bg-gradient-to-b from-darkerBlue to-darkBlue">
      <div className="relative z-20 flex flex-col">
        <div className="m-8 text-center lg:text-left">
          <h2 className="font-Orbitron text-xl text-electricBlue font-medium">
            Calculate the time and cost of charging your car
          </h2>
        </div>
        <div className="flex flex-col font-Roboto text-base calc-size:ml-5 font-bold m-8 mt-0">
          <div className="flex flex-col lg:flex-row justify-around my-2 gap-x-2 gap-y-4 lg:gap-x-4">
            <select
              className="py-2 px-3 rounded w-full lg:w-[45%] bg-no-repeat bg-[calc(100%-1rem)_center] bg-[length:1.25rem_1.25rem] bg-dropdownArrow appearance-none hover:bg-gray-300 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="manufacturer"
              value={manufacturer}
              onChange={(e) => setManu(e.target.value)}
            >
              <option value="" disabled>
                Select manufacturer
              </option>
            </select>
            <select
              className="py-2 px-3 rounded w-full lg:w-[45%] bg-no-repeat bg-[calc(100%-1rem)_center] bg-[length:1.25rem_1.25rem] bg-dropdownArrow appearance-none hover:bg-gray-300 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="power"
              value={power}
              onChange={(e) => setPower(e.target.value)}
            >
              <option value="" disabled>
                Select charger power kW
              </option>
            </select>
          </div>
          <div className="flex flex-col lg:flex-row justify-around my-2 gap-x-2 gap-y-4 lg:gap-x-4">
            <select
              className="py-2 px-3 rounded w-full lg:w-[45%] bg-no-repeat bg-[calc(100%-1rem)_center] bg-[length:1.25rem_1.25rem] bg-dropdownArrow appearance-none hover:bg-gray-300 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="model"
              value={model}
              onChange={(e) => setModel(e.target.value)}
            >
              <option value="" disabled>
                Select model
              </option>
            </select>
            <select
              className="py-2 px-3 rounded w-full lg:w-[45%] bg-no-repeat bg-[calc(100%-1rem)_center] bg-[length:1.25rem_1.25rem] bg-dropdownArrow appearance-none hover:bg-gray-300 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="cost"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
            >
              <option value="" disabled>
                Electricity cost €/kWh
              </option>
            </select>
          </div>
        </div>
        <div className="flex justify-between items-center pb-4 md:pb-0">
          <button className="font-Roboto bg-lilac rounded-lg text-xl py-1 px-12 ml-8 text-white hover:bg-darkLilac hover:text-white transition duration-500">
            Next
          </button>
          <img src={logo} alt="logo" className="w-20 pr-8" />
        </div>
      </div>
    </div>
  );
}

export default Calculator;

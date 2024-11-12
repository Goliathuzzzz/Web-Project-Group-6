import React from "react";
import { useState } from "react";
import logo from "../../assets/images/logo.png";

function Calculator() {
  const [manufacturer, setManu] = useState("");
  const [power, setPower] = useState("");
  const [model, setModel] = useState("");
  const [cost, setCost] = useState("");

  return (
    <div className="flex flex-col bg-gradient-to-b mx-4 from-darkerBlue to-darkBlue rounded-md shadow-xl shadow-lightGreen">
      <div className="m-8 text-center md:text-left">
        <h2 className="font-Orbitron text-2xl text-electricBlue font-medium">
          Calculate the time and cost of charging you car
        </h2>
      </div>
      <div className="flex flex-col font-Roboto text-xl m-8">
        <div className="flex justify-between my-2">
          <select
            className="py-2 px-3 rounded-lg w-[42%]"
            name="manufacturer"
            value={manufacturer}
            onChange={(e) => setManu(e.target.value)}
          >
            <option value="" disabled>
              Select manufacturer
            </option>
          </select>
          <select
            className="py-2 px-3 rounded-lg w-[42%]"
            name="power"
            value={power}
            onChange={(e) => setPower(e.target.value)}
          >
            <option value="" disabled>
              Select charger power kW
            </option>
          </select>
        </div>
        <div className="flex justify-between my-2">
          <select
            className="py-2 px-3 rounded-lg w-[42%]"
            name="model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          >
            <option value="" disabled>
              Select model
            </option>
          </select>
          <select
            className="py-2 px-3 rounded-lg w-[42%]"
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
      <div className="flex justify-between items-center mb-2">
        <button className="font-Roboto bg-lilac rounded-lg text-xl py-1 px-12 ml-8 text-white ">
          Next
        </button>
        <img src={logo} alt="logo" />
      </div>
    </div>
  );
}

export default Calculator;

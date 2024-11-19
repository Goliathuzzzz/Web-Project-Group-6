import React from "react";
import { useState } from "react";
import Tesla from "../../assets/images/tesla_img.png";
import Type2 from "../../assets/images/type2_img.png";
import CCS2 from "../../assets/images/ccs6_img.png";
import Chademo from "../../assets/images/chademo_img.png";
import Cancel from "../../assets/images/close.png";

function FilterBox({ title, onClose }) {
  const [chargingPower, setChargingPower] = useState(22);

  return (
    <div className="absolute right-16 top-0 bg-gradient-to-b from-darkerBlue to-darkBlue p-4 shadow-lg rounded w-96">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold font-Orbitron text-white">
          {title}
        </h3>
        <button onClick={onClose} className="transition-transform duration-200 hover:scale-125 hover:brightness-150 pr-1">
          <img src={Cancel} alt="Cancel" className="w-3 h-3" />
        </button>
      </div>

      {/* Charger types */}
      <div className="mb-4">
        <div className="grid grid-cols-1 gap-2">
          <button className="p-2 flex items-start rounded bg-ctaYellow bg-opacity-15 transition-transform duration-200 hover:scale-105 hover:brightness-150">
            <div className="flex flex-col items-start">
              <span className="text-ctaYellow font-Orbitron">Type 2</span>
              <span className="text-sm text-white font-Roboto">
                Lorem ipsum dolor sit amet consectetur. Eget duis nullam
                tincidunt sed. Molestie pretium at.
              </span>
            </div>
            <img
              src={Type2}
              alt="Type 2"
              className="ml-auto w-10 h-10 self-center"
            />
          </button>
          <button className="p-2 flex items-start rounded bg-salmonRed bg-opacity-15 transition-transform duration-200 hover:scale-105 hover:brightness-150">
            <div className="flex flex-col items-start">
              <span className="text-salmonRed font-Orbitron">CCS2</span>
              <span className="text-sm text-white">
                Lorem ipsum dolor sit amet consectetur. Eget duis nullam
                tincidunt sed. Molestie pretium at.
              </span>
            </div>
            <img
              src={CCS2}
              alt="CCS2"
              className="ml-auto w-10 h-10 self-center"
            />
          </button>
          <button className="p-2 flex items-start rounded bg-electricBlue bg-opacity-15 transition-transform duration-200 hover:scale-105 hover:brightness-150">
            <div className="flex flex-col items-start">
              <span className="text-electricBlue font-Orbitron">CHAdeMO</span>
              <span className="text-sm text-white">
                Lorem ipsum dolor sit amet consectetur. Eget duis nullam
                tincidunt sed. Molestie pretium at.
              </span>
            </div>
            <img
              src={Chademo}
              alt="CHAdeMO"
              className="ml-auto w-10 h-10 self-center"
            />
          </button>
          <button className="p-2 flex items-start rounded bg-eGreen bg-opacity-15 transition-transform duration-200 hover:scale-105 hover:brightness-150">
            <div className="flex flex-col items-start">
              <span className="text-eGreen font-Orbitron">Tesla</span>
              <span className="text-sm text-white">
                Lorem ipsum dolor sit amet consectetur. Eget duis nullam
                tincidunt sed. Molestie pretium at.
              </span>
            </div>
            <img
              src={Tesla}
              alt="Tesla"
              className="ml-auto w-10 h-10 self-center"
            />
          </button>
        </div>
      </div>

      {/* Car battery voltage */}
      <div className="mb-4">
        <div className="flex gap-2 bg-mediumBlue p-2 items-center rounded-md">
          <h4 className="font-semibold text-sm text-white font-Orbitron">
            Car Battery Voltage
          </h4>
          <button className="border px-4 py-1 rounded-lg text-white hover:bg-paleBlue font-Roboto ml-auto">
            400V
          </button>
          <button className="border px-4 py-1 rounded-lg text-white hover:bg-paleBlue font-Roboto">
            800V
          </button>
        </div>
      </div>

      {/* Charging power */}
      <div className="bg-mediumBlue p-2 rounded-md">
        <h4 className="font-semibold mb-2 text-white font-Orbitron">
          Charging Power
        </h4>
        <div className="flex justify-between text-sm mt-1 text-white pb-2">
          <span>{chargingPower} kW</span>
          <span>350 kW+</span>
        </div>
        <input
          type="range"
          min="22"
          max="350"
          step="1"
          value={chargingPower}
          onChange={(e) => setChargingPower(e.target.value)}
          className="w-full"
        />
      </div>
    </div>
  );
}

export default FilterBox;

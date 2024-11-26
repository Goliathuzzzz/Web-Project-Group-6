import React from "react";
import { useState } from "react";
import Cancel from "../../assets/images/close.png";
import { useFilterData } from "./FilterDataContext";

function FilterBox({
  title,
  query,
  onUpdateQuery,
  onClearQuery,
  onClose,
  chargerData,
}) {
  const [chargingPower, setChargingPower] = useState(22);
  const { providers, locations } = useFilterData();

  const handleClearQuery = () => {
    onClearQuery();
  };

  const handleClose = () => {
    onClose();
  };

  const search = async () => {
    const stationSearch = "api/stations/customSearch?" + query;
    console.log(stationSearch);
    try {
      const res = await fetch(stationSearch);
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.error("Failed to fetch stations", error);
    }
  };

  return (
    <div className="absolute right-16 top-0 bg-gradient-to-b from-darkerBlue to-darkBlue p-4 shadow-lg rounded w-96">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold font-Orbitron text-white">
          {title}
        </h3>
        <button
          className="text-lg font-semibold font-Orbitron text-eGreen transition-transform duration-200 hover:scale-125"
          onClick={search}
        >
          Search
        </button>
        <button
          onClick={handleClose}
          className="transition-transform duration-200 hover:scale-125 hover:brightness-150 pr-1"
        >
          <img src={Cancel} alt="Cancel" className="w-3 h-3" />
        </button>
      </div>

      {/* Providers */}
      {title === "Provider Filter" && (
        <div className="mb-4">
          <div className="flex flex-col gap-2 bg-mediumBlue p-2 items-start rounded-md max-h-40 overflow-auto">
            <h4 className="font-semibold text-sm text-white font-Orbitron">
              Providers:
            </h4>
            {providers.map((provider) => (
              <label key={provider.id} className="flex items-center">
                <input
                  type="checkbox"
                  value={provider.provider}
                  onChange={(e) => onUpdateQuery(e.target.value)}
                  className="mr-2"
                />
                <span className="text-white">{provider.provider}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Locations */}
      {title === "Location Filter" && (
        <div className="mb-4">
          <div className="flex flex-col gap-2 bg-mediumBlue p-2 items-start rounded-md max-h-40 overflow-auto">
            <h4 className="font-semibold text-sm text-white font-Orbitron">
              Locations:
            </h4>
            {locations.map((location) => (
              <label key={location.id} className="flex items-center">
                <input
                  type="checkbox"
                  value={location.location}
                  onChange={(e) => onUpdateQuery(e.target.value)}
                  className="mr-2"
                />
                <span className="text-white">{location.location}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Charger types */}
      {title === "Charger Type Filter" && (
        <div className="mb-4">
          <div className="grid grid-cols-1 gap-2">
            {chargerData.map((filter) => (
              <button
                key={filter.id}
                className={`p-2 flex items-start rounded ${filter.bgColor} bg-opacity-15 transition-transform duration-200 hover:scale-105 hover:brightness-150`}
                onClick={() => onUpdateQuery(filter.type)}
              >
                <div className="flex flex-col items-start">
                  <span className={`${filter.textColor} font-Orbitron`}>
                    {filter.label}
                  </span>
                  <span className="text-sm text-white font-Roboto">
                    {filter.description}
                  </span>
                </div>
                <img
                  src={filter.image}
                  alt={filter.label}
                  className="ml-auto w-10 h-10 self-center"
                />
              </button>
            ))}
          </div>
        </div>
      )}

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
      <button
        className="mt-2 text-lg font-semibold font-Orbitron text-salmonRed transition-transform duration-200 hover:scale-125"
        onClick={handleClearQuery}
      >
        Reset Filters
      </button>
    </div>
  );
}

export default FilterBox;

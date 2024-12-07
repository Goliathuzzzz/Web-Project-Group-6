import React from "react";

const Inputs = ({ power, setPower, cost, setCost, batteryCapacity, setBatteryCapacity, currentCharge, setCurrentCharge, efficiency, setEfficiency }) => (
    <div className="flex flex-col font-Roboto text-base calc-size:ml-5 font-bold m-8 mt-0 mb-1">
        {/* Battery capacity, charger power */}
        <div className="flex flex-col lg:flex-row justify-around my-2 gap-x-2 gap-y-4 lg:gap-x-4">
            <input
                type="number"
                placeholder="Battery capacity (kWh)"
                className="py-2 px-3 rounded w-full lg:w-[45%]"
                value={batteryCapacity}
                onChange={(e) => setBatteryCapacity(e.target.value)}
            />
            <input
                type="number"
                placeholder="Enter charger power (kW)"
                className="py-2 px-3 rounded w-full lg:w-[45%]"
                value={power}
                onChange={(e) => setPower(e.target.value)}
            />
        </div>
        {/* Current charge, electricity cost */}
        <div className="flex flex-col lg:flex-row justify-around my-2 gap-x-2 gap-y-4 lg:gap-x-4">
            <input
                type="number"
                placeholder="Current charge (%)"
                className="py-2 px-3 rounded w-full lg:w-[45%]"
                value={currentCharge}
                onChange={(e) => setCurrentCharge(e.target.value)}
            />
            <input
                type="number"
                placeholder="Electricity cost (€/kWh)"
                className="py-2 px-3 rounded w-full lg:w-[45%]"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
            />
        </div>
        {/* Efficiency */}
        <div className="flex flex-col lg:flex-row justify-start my-2 ml-4 gap-x-2 gap-y-4 lg:gap-x-4">
            <input
                type="number"
                placeholder="Efficiency (%)"
                className="py-2 px-3 rounded w-full lg:w-[46%]"
                value={efficiency}
                onChange={(e) => setEfficiency(e.target.value)}
            />
        </div>
    </div>
);

export default Inputs;

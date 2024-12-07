import React from "react";

const Results = ({ result, targetCharge, handleSliderChange, resetCalculator }) => (
    <div className="m-8 text-center lg:text-left">
        <h2 className="font-Orbitron text-xl text-electricBlue font-medium">
            Charging time and cost
        </h2>
        <div className="text-white font-Roboto text-lg mb-4">
            <p>Battery Capacity: <strong>{result.inputs.batteryCapacity} kWh</strong></p>
            <p>Charger Power: <strong>{result.inputs.power} kW</strong></p>
            <p>Electricity Cost: <strong>{result.inputs.cost} €/kWh</strong></p>
            <p>Current Charge: <strong>{result.inputs.currentCharge} %</strong></p>
        </div>
        <p className="text-white font-Roboto text-lg mb-4">
            Charging Time: <strong>{result.time} hours</strong>
        </p>
        <p className="text-white font-Roboto text-lg mb-4">
            Charging Cost: <strong>{result.cost} €</strong>
        </p>
        <div className="flex flex-col items-center mt-4">
            <label className="text-white font-Roboto text-lg mb-2">
                Adjust Target Charge: {targetCharge}%
            </label>
            <input
                type="range"
                min={parseFloat(result.inputs.currentCharge) + 1}
                max={100}
                value={targetCharge}
                onChange={(e) => handleSliderChange(e.target.value)}
                className="w-full"
            />
        </div>
        <button
            onClick={resetCalculator}
            className="font-Roboto bg-lilac rounded-lg text-xl py-1 px-12 text-white hover:bg-darkLilac hover:text-white transition duration-500"
        >
            Calculate Again
        </button>
    </div>
);

export default Results;
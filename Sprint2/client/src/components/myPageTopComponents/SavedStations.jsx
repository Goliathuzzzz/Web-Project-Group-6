import React from "react";
import { stations } from "./stationData";
import Station from "./Station";

function SavedStations() {
  return (
    <div className="flex justify-center items-center mx-4 md:ml-0 bg-gradient-to-b from-darkerBlue to-darkBlue rounded-sm md:max-w-xl md:min-w-xl mt-10">
      <div className="flex flex-col bg-mediumBlue p-4 m-8 rounded-sm">
        <h2 className="text-xl font-Orbitron text-ctaYellow text-center md:text-left font-medium tracking-wider p-1">
          Saved Stations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 ">
          {stations.map((item) => {
            return <Station key={item.id} name={item.name} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default SavedStations;

import React, { useState } from "react";
import { stations as initialStations } from "./stationData";
import Station from "./Station";

function SavedStations() {
  const [stations, setStations] = useState(initialStations);

  const removeStation = (id) => {
    setStations(stations.filter((station) => station.id !== id));
  };

  return (
    <div className="flex justify-center items-center mx-4 my-page:ml-0 bg-gradient-to-b from-darkerBlue to-darkBlue rounded-sm my-page:max-w-xl md:min-w-96 mt-4 my-page:mt-10">
      <div className="flex flex-col bg-mediumBlue p-6 m-5 rounded-sm max-h-36 overflow-y-scroll saved-stations:min-h-[144px] saved-stations:min-w-[425px]">
        <h2 className="text-xl font-Orbitron  text-ctaYellow text-center my-page:text-left font--medium tracking-wider pb-2 sticky top-0 bg-mediumBlue z-10">
          Saved Stations
        </h2>
        <div className="grid grid-cols-1 saved-stations:grid-cols-2">
          {stations.length > 0 ? (
            stations.map((item) => (
              <Station
                key={item.id}
                name={item.name}
                removeStation={() => removeStation(item.id)}
              />
            ))
          ) : (
            <p className="text-gray-400 text-center col-span-2">
              No stations saved
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SavedStations;

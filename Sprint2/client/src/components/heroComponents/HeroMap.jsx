import React from "react";
import { Link } from "react-router-dom";
import Map from "../../assets/images/map_mini.png";
import Search from "../../assets/images/search.png";

function HeroMap() {
  return (
    <>
      {/* Map container */}
      <div className="relative h-80 md:w-[40%]">
        <img src={Map} alt="mini-map" className="object-cover w-full h-full" />
        {/* Small search bar in the top left corner */}
        <div className="absolute top-4 left-4 w-7/12 flex flex-col md:map-buttons-size:flex-row map-buttons-size:items-center map-buttons-size:space-x-4">
          <div className="relative w-full">
            <input
              type="text"
              name="query"
              placeholder="Search"
              className="w-full py-1 pl-10 pr-4 text-white rounded-full bg-searchBarBg focus:outline-none focus:ring-2 focus:ring-searchBarSelected shadow-inner-lg font-Roboto"
            />
            <img
              src={Search}
              alt="Search Icon"
              className="absolute left-3 top-1.5 h-5 w-5 text-gray-400 font-Roboto"
            />
          </div>
          <Link
            to="/map"
            className="mt-4 map-buttons-size:mt-0 w-fit py-1.5 px-7 text-sm text-white rounded-full bg-gradient-to-b from-darkerBlue to-darkBlue font-Roboto whitespace-nowrap transform transition-transform duration-200 hover:scale-110 hover:brightness-150"
          >
            Open Map
          </Link>
        </div>
      </div>
    </>
  );
}

export default HeroMap;

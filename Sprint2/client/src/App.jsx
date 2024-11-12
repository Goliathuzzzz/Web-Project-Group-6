import React from "react";
import Hero from "./components/Hero";
import Login from "./components/Login";
import Map from "./components/Map";
import stations from "../../server/mock-data/ev_stations_mock_data.json";

/* Placeholder code for testing */
function App() {
  return (
    <>
      <div className="max-w-screen-2xl m-auto">
        <Map stations={stations} />
      </div>
    </>
  );
}

export default App;

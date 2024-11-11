import React from "react";
import Hero from "./components/heroComponents/Hero";
import ProcessList from "./components/processComponents/ProcessList";
import ReviewList from "./components/ReviewComponents/ReviewList";

/* Placeholder code for testing */
function App() {
  return (
    <>
      <div className="max-w-screen-2xl m-auto bg-darkerBlue">
        <Hero />
        <ProcessList />
        <ReviewList />
      </div>
    </>
  );
}

export default App;

import React from "react";
import Hero from "./components/heroComponents/Hero";
import NavBar from "./components/navBarComponents/NavBar";
import Footer from "./components/footerComponents/Footer";
import ProfilePic from "./assets/images/reviewer_2.png";
import Specifications from "./components/myPageBottomComponents/Specifications";

/* Placeholder code for testing */
function App() {
  return (
    <>
      <div className="max-w-screen-2xl m-auto bg-homepage bg-cover">
        <NavBar profilePicture={ProfilePic}/>
        {/*<Hero />*/}
        <Specifications />
        <Footer />
      </div>
    </>
  );
}

export default App;

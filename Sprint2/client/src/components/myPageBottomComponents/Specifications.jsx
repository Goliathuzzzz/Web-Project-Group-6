import React, { useEffect, useState } from "react";
import Car from "../../assets/images/tesla_car.png";
import Charger from "../../assets/images/Tesla.png";
import { useProfile } from "../../ProfileContext";

function Specifications() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { setProfile } = useProfile();
  useEffect(() => {
    const storedProfile = localStorage.getItem("profile");
    if (storedProfile) {
      const profile = JSON.parse(storedProfile);
      setProfile(profile);
      console.log(profile);
      setName(profile.name);
      setEmail(profile.email);
    }
  }, [setProfile]);

  return (
    <div className="flex flex-col lg:flex-row justify-center gap-8 p-4">
      {/* Main specifications section */}
      <div className="flex bg-gradient-to-b from-darkSlate to-customBlue rounded-sm gap-4 p-4 w-fit">
        {/* Left side car spec and filters */}
        <div className="flex flex-col space-y-4">
          <div className="car-spec-container p-5 text-left text-white bg-myPageBlue rounded-sm">
            <h1 className="text-base font-Orbitron">Tesla</h1>
            <h2 className="text-base font-Orbitron">Model X</h2>
            <img
              src={Charger}
              alt="Tesla Charger"
              className="h-10 max-w-xs ml-2 mt-1"
            />
          </div>

          {/* Map filters section */}
          <div className="text-base font-Orbitron text-white bg-myPageBlue p-4 rounded-sm">
            <h3 className="mb-2 text-salmonRed">Map Filters</h3>

            <div className="mb-4">
              <label className="block mb-1">Charger Type</label>
              <select className="w-full p-2 bg-darkSlate text-white rounded-sm">
                <option>Type 1</option>
                <option>Type 2</option>
                <option>Type 3</option>
                <option>Type 4</option>
                <option>Type 5</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block mb-1">Charger Power (kW)</label>
              <select className="w-full p-2 bg-darkSlate text-white rounded-sm">
                <option>0-50 kW</option>
                <option>50-100 kW</option>
                <option>100-150 kW</option>
                <option>150-250 kW</option>
                <option>250-350 kW</option>
              </select>
            </div>

            <div>
              <label className="block mb-1">Service Provider</label>
              <select className="w-full p-2 bg-darkSlate text-white rounded-sm">
                <option>Provider 1</option>
                <option>Provider 2</option>
                <option>Provider 3</option>
                <option>Provider 4</option>
                <option>Provider 5</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right side car image */}
        <div className="bg-myPageBlue pb-20 flex justify-center">
          <img src={Car} alt="Tesla Model X" className="h-auto w-60" />
        </div>
      </div>

      {/* Reviews and profile Section */}
      <div className="flex flex-col gap-4 lg:items-start items-center">
        {/* Reviews section */}
        <div className="bg-gradient-to-b from-darkSlate to-customBlue text-white rounded-sm p-4 w-80 h-96 overflow-y-scroll">
          <h2 className="p-3 text-lg font-Orbitron mb-4 bg-myPageBlue text-eGreen rounded-sm">
            My Reviews
          </h2>
          <div className="space-y-4">
            <div className="p-3 bg-myPageBlue rounded-sm">
              <p>"Review 1."</p>
              <span>- Reviewer 1</span>
            </div>
            <div className="p-3 bg-myPageBlue rounded-sm">
              <p>"Review 2."</p>
              <span>- Reviewer 2</span>
            </div>
            <div className="p-3 bg-myPageBlue rounded-sm">
              <p>"Review 3."</p>
              <span>- Reviewer 3</span>
            </div>
            <div className="p-3 bg-myPageBlue rounded-sm">
              <p>"Review 4."</p>
              <span>- Reviewer 4</span>
            </div>
            <div className="p-3 bg-myPageBlue rounded-sm">
              <p>"Review 5."</p>
              <span>- Reviewer 5</span>
            </div>
          </div>
        </div>

        {/* Profile section */}
        <div className="bg-gradient-to-b from-darkSlate to-customBlue text-white rounded-sm p-4 w-80">
          <h3 className="text-base font-Orbitron mb-2 font-bold">
            Profile Information
          </h3>
          <div className="space-y-2">
            <div>
              <span className="font-bold">Name: </span>
              {name}
            </div>
            <div>
              <span className="font-bold">Email: </span>
              {email}
            </div>
            <div>
              <span className="font-bold">Location: </span>
              {""}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Specifications;

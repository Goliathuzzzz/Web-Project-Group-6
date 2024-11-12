import React from "react";
import jonne from "../../assets/images/reviewer_1.png";
import edit from "../../assets/images/edit.png";

function ProfilePic() {
  const name = "Jonne Roponen";
  const image = jonne;
  return (
    <div className="flex bg-gradient-to-b from-darkerBlue to-mediumBlue md:max-w-md justify-between rounded-lg shadow-lg shadow-black">
      {/* Invisible container for layout */}
      <div className="w-11"></div>
      <div className="flex flex-col items-center text-white font-Orbitron tracking-wider text-xl mb-3">
        <img src={image} alt="Jonne" className="w-32 h-32 rounded-full my-3" />
        <h2>{name}</h2>
      </div>
      <img src={edit} alt="Edit profile" className="w-8 h-8 my-5 mr-3" />
    </div>
  );
}

export default ProfilePic;

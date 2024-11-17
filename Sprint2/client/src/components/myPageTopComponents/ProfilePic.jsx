import React, { useEffect, useState } from "react";
import edit from "../../assets/images/edit.png";
import { useProfile } from "../../ProfileContext";

function ProfilePic() {
  const [name, setName] = useState("");
  const [pic, setPic] = useState(null);
  const { setProfile } = useProfile();
  useEffect(() => {
    const storedProfile = localStorage.getItem("profile");
    if (storedProfile) {
      const profile = JSON.parse(storedProfile);
      setProfile(profile);
      console.log(profile);
      setName(profile.name);
      setPic(profile.picture);
    }
  }, [setProfile]);

  return (
    <div className="flex bg-gradient-to-b from-darkerBlue to-mediumBlue md:max-w-md justify-between rounded-lg shadow-lg shadow-black">
      {/* Invisible container for layout */}
      <div className="w-11"></div>
      <div className="flex flex-col items-center text-white font-Orbitron tracking-wider text-xl mb-3">
        <img src={pic} alt="Jonne" className="w-32 h-32 rounded-full my-3" />
        <h2>{name}</h2>
      </div>
      <img src={edit} alt="Edit profile" className="w-8 h-8 my-5 mr-3" />
    </div>
  );
}

export default ProfilePic;

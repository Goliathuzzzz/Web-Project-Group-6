import React, { useState, useEffect } from "react";
import user_circle from "../../assets/images/user_big.png";
import edit from "../../assets/images/edit.png";
import Cancel from "../../assets/images/close.png";
import { useAuth } from "../../../routes/AuthProvider";

function ProfilePic() {
  const [isWindowOpen, setIsWindowOpen] = useState(false);
  const [username, setName] = useState("");
  const [pic, setPic] = useState(user_circle);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      setName(user.username);
      setPic(user.picture || user_circle);
    }
  }, [user]);

  return (
    <div className="relative flex bg-gradient-to-b mx-4 my-page:mr-0 from-darkerBlue to-darkBlue my-page:max-w-md my-page:w-profileWidth justify-center rounded-sm mt-10 items-center">
      {/* Profile image and username */}
      <div className="flex flex-col items-center text-white font-Orbitron tracking-wider text-xl my-4 my-page:my-0 z-10">
        <img
          src={pic}
          alt="profile-picture"
          className="w-28 h-28 rounded-full"
        />
        <h2>{username}</h2>
      </div>

      {/* Edit button */}
      <img
        src={edit}
        alt="Edit profile"
        className="absolute top-3 right-3 w-8 h-8 cursor-pointer transition-transform duration-200 hover:scale-105 hover:brightness-150"
        onClick={() => setIsWindowOpen(true)}
      />

      <div className="absolute bottom-0 left-0 w-full h-16 bg-mediumBlue" />

      {isWindowOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-myPageBlue w-[400px] h-[300px] rounded-lg shadow-lg">
            <div className="flex justify-between items-center bg-eGreen px-4 py-2 rounded-t-lg">
              <h3 className="text-lg font-semibold font-Roboto">
                Edit Profile Picture
              </h3>
              <button
                className="transition-transform duration-200 hover:scale-125 hover:brightness-150"
                onClick={() => setIsWindowOpen(false)}
              >
                <img src={Cancel} alt="Cancel" className="w-3 h-3" />
              </button>
            </div>
            <div className="p-4 flex flex-col items-center">
              <img
                src={pic}
                alt="profile-picture"
                className="w-28 h-28 rounded-sm mb-4"
              />
              <p className="text-center font-Roboto text-white">
                Current Profile Picture
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePic;

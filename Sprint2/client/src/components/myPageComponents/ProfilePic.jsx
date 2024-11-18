import React, { useState } from "react";
import pic from "../../assets/images/my-page-img.png";
import edit from "../../assets/images/edit.png";

function ProfilePic() {
  const [isWindowOpen, setIsWindowOpen] = useState(false);

  return (
    <div className="flex bg-gradient-to-b mx-4 my-page:mr-0 from-darkerBlue to-darkBlue my-page:max-w-md justify-between rounded-sm mt-10">
      <div className="w-24"></div>
      <div className="flex flex-col items-center text-white font-Orbitron tracking-wider text-xl mb-3">
        <img src={pic} alt="profile-picture" className="w-32 h-32 rounded-full my-3" />
        <h2>Jonne Roponen</h2>
      </div>
      <div className="w-8"></div>
      <img
        src={edit}
        alt="Edit profile"
        className="w-8 h-8 my-5 mr-3 cursor-pointer"
        onClick={() => setIsWindowOpen(true)}
      />

      {isWindowOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-myPageBlue w-[400px] h-[300px] rounded-lg shadow-lg">
            <div className="flex justify-between items-center bg-eGreen px-4 py-2 rounded-t-lg">
              <h3 className="text-lg font-semibold font-Roboto">Edit Profile Picture</h3>
              <button
                className="text-gray-600 hover:text-gray-800"
                onClick={() => setIsWindowOpen(false)}
              >
                ✕
              </button>
            </div>
            <div className="p-4 flex flex-col items-center">
              <img src={pic} alt="profile-picture" className="w-32 h-32 rounded-sm mb-4" />
              <p className="text-center font-Roboto text-white">Current Profile Picture</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePic;

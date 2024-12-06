import React, { useState, useEffect } from "react";
import user_circle from "../../assets/images/user_big.png";
import edit from "../../assets/images/edit.png";
import Cancel from "../../assets/images/close.png";
import { useAuth } from "../../../routes/AuthProvider";

function ProfilePic() {
  const [isWindowOpen, setIsWindowOpen] = useState(false);
  const [username, setName] = useState("");
  const [location, setLocation] = useState("");
  const [pic, setPic] = useState(user_circle);
  const [updatedLocation, setUpdatedLocation] = useState("");
  const [newProfilePic, setNewProfilePic] = useState(null);
  const { user, token } = useAuth();

  const handleFileChange = (e) => {
    setNewProfilePic(e.target.files[0]);
  };

  useEffect(() => {
    if (user) {
      console.log(user);
      setName(user.username);
      setLocation(user.location);
      setPic(user.picture ? user.picture : user_circle);
    }
  }, [user]);

  const updateUser = async (formData) => {
    try {
      const id = user._id;
      const res = await fetch(`api/users/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to update user");
      }
      const resData = await res.json();
      console.log(resData);
      setPic(resData.picture ? resData.picture : user_circle);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = () => {
    const updatedUser = {
      username: username,
      location: location,
      picture: newProfilePic,
    };
    console.log(updatedUser);
    const formData = new FormData();
    if (updatedUser.username) formData.append("username", updatedUser.username);
    if (updatedUser.location) formData.append("location", updatedUser.location);
    if (updatedUser.picture) {
      formData.append("picture", updatedUser.picture);
    }
    updateUser(formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate();
    setIsWindowOpen(false);
  };

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
          <div className="bg-myPageBlue w-[400px] rounded-lg shadow-lg">
            <div className="flex justify-between items-center bg-eGreen px-4 py-2 rounded-t-lg">
              <h3 className="text-lg font-semibold font-Roboto">
                Edit Profile
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
                className="w-28 h-28 rounded-full mb-4"
              />
              <p className="text-center font-Roboto text-white">
                Current Profile Picture
              </p>
              <form onSubmit={handleSubmit} className="flex flex-col">
                <input
                  type="text"
                  placeholder=""
                  value={username}
                  onChange={(e) => setName(e.target.value)}
                  className="mb-2"
                />
                <input
                  type="text"
                  placeholder=""
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="mb-2"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="mb-2"
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-eGreen to-darkGreen py-1 px-4 rounded-full hover:bg-darkGreen hover:text-white transition-all duration-500 font-bold text-1xl font-Roboto"
                >
                  Update user info
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePic;

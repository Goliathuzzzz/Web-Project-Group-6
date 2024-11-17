import React, { createContext, useState, useContext } from "react";

// Create the context
const ProfileContext = createContext();

// Create a provider component
export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

// Create a custom hook to use the ProfileContext
export const useProfile = () => {
  return useContext(ProfileContext);
};

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const FilterDataContext = createContext();

export const useFilterData = () => useContext(FilterDataContext);

export const FilterDataProvider = ({ children }) => {
  const [providers, setProviders] = useState([]);
  const [locations, setLocations] = useState([]);

  const getAllFilterData = async () => {
    try {
      const res = await axios.get(`/api/chargers/filters`, {});
      const data = res.data;
      console.log(data);
      return data;
    } catch (error) {
      console.error("Failed to fetch providers and stations", error);
      return { locations: [], providers: [] }; // Return empty arrays in case of error
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const { locations, providers } = await getAllFilterData();
      if (locations && providers) {
        setLocations(locations);
        setProviders(providers);
      }
    };

    fetchData();
  }, []);

  return (
    <FilterDataContext.Provider value={{ providers, locations }}>
      {children}
    </FilterDataContext.Provider>
  );
};

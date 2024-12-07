import { useEffect, useState } from "react";
import axios from "axios";

// Hook to fetch saved stations from the backend
export const useSavedStations = (query) => {
  const [stations, setStations] = useState([]);
  const [error, setError] = useState(null);

  const fetchStations = async (queryString) => {
    try {
      const response = await axios.get(`/api/chargers/${queryString}`, {
      });
      setStations(response.data);
    } catch (err) {
      setError(err);
      console.error("Error fetching stations:", err);
    }
  };

  useEffect(() => {
    fetchStations(query); // Fetch initial stations on load
  }, []);

  return { stations, fetchStations, error };
};
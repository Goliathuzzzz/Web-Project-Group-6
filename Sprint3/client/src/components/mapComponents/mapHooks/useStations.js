import { useEffect, useState } from "react";
import axios from "axios";

// Hook to fetch stations from the backend
export const useStations = (initialBounds) => {
  const [stations, setStations] = useState([]);
  const [error, setError] = useState(null);

  const fetchStations = async (bounds) => {
    try {
      const response = await axios.get("/api/chargers", {
        params: { ...bounds, maxResults: 100 },
      });
      setStations(response.data);
      console.log("Fetched stations:", response.data);
    } catch (err) {
      setError(err);
      console.error("Error fetching stations:", err);
    }
  };

  useEffect(() => {
    fetchStations(initialBounds); // Fetch initial stations on load
  }, []);

  return { stations, fetchStations, error };
};

import { useEffect, useState } from "react";
import { useAuth } from "../../../../routes/AuthProvider";


export const useUserStationIds = () => {
    const { token } = useAuth();
    const [user, setUser] = useState(null);
    const fetchUser = async (token) => {
        try {
            const response = await fetch("/api/users/me", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            const res = await response.json();
            if (response.ok) {
                setUser(res.user);
            } else {
                console.error(res.message);
                logOut();
            }
        } catch (error) {
            console.error("Failed to fetch user data:", error);
            logOut();
        }
    };

    const getStationIds = (user) => {
        return user?.stations.map((station) => station.id);
    };

    useEffect(() => {
        fetchUser(token);
    }, [user]);

    return { fetchUser, getStationIds, user };
 };
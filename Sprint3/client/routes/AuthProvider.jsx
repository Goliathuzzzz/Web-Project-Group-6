import { useGoogleLogin } from "@react-oauth/google";
import { useGoogleOneTapLogin } from "@react-oauth/google";
import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      if (token) {
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
      }
    };
    fetchUserData();
  }, [token]);

  const loginAction = async (email, password) => {
    try {
      const response = await fetch("api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      });
      const res = await response.json();
      console.log(res);
      if (res) {
        setUser(res);
        setToken(res.token);
        localStorage.setItem("site", res.token);
        navigate("/");
        return;
      }
      throw new Error(res.message);
    } catch (err) {
      console.error(err);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      if (tokenResponse) {
        console.log(
          "Fetching user info with access token:",
          tokenResponse.access_token
        );
        try {
          const response = await fetch("/api/users/google-login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: tokenResponse.access_token }), // Use the access token
          });
          const data = await response.json();
          if (data.token) {
            setUser(data.user);
            setToken(data.token);
            localStorage.setItem("site", data.token);
            navigate("/");
          } else {
            throw new Error(data.message);
          }
        } catch (error) {
          console.error("Google login failed:", error);
        }
      }
    },
  });

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("site");
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ token, user, loginAction, googleLogin, logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};

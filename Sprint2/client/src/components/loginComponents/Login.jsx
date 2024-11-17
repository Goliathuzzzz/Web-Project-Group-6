import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import google from "../../assets/images/google_logo.png";
import image from "../../assets/images/login_page.png";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

function Login() {
  const [user, setUser] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const gLogin = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (user && user.access_token) {
      console.log("Fetching user info with access token:", user.access_token);
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          console.log("User info fetched:", res.data);
          localStorage.setItem("googleProfile", JSON.stringify(res.data));
          navigate("/");
          window.location.reload();
        })
        .catch((err) => console.log("Error fetching user info:", err));
    }
  }, [user]);

  const handleLogin = () => {
    if (username && password) {
      console.log("Logging in:", { username, password, rememberMe });
      //login logic here
    } else {
      alert("Please enter both username and password.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="flex flex-col bg-white max-w-[450px] min-w-[300px] lg:w-1/2 xl:w-1/2 sm:w-1/2 justify-center items-center h-1/2 w-1/4 font-Roboto">
        <button
          onClick={gLogin}
          className="flex items-center justify-center border p-2 mb-2 w-3/4 rounded-sm border-borderBlue"
        >
          <img src={google} alt="Google Logo" className="w-6 h-6 mr-2" />
          <span className="text-gray-700 font-medium text-xs">
            Sign in with Google 🚀
          </span>
        </button>
        <p className="flex mb-2 font-bold">Or</p>
        <form
          className="w-full flex flex-col items-center"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            className="flex w-3/4 border mb-2 rounded-sm bg-inputGrey text-xs p-1 border-borderBlue pl-2"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          ></input>
          <input
            className="flex w-3/4 border mb-2 rounded-sm bg-inputGrey text-xs p-1 border-borderBlue "
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <div className="w-3/4 flex flex-row justify-start mb-2 items-center">
            <input
              type="checkbox"
              className="appearance-none h-3 w-3 rounded-sm border border-borderBlue checked:bg-borderBlue checked:after:content-['✓'] checked:after:text-xs flex items-center justify-center focus:ring-2 focus:ring-offset-1"
              id="remember-me"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            ></input>
            <label htmlFor="remember-me" className="pl-2 font-bold text-xs p-1">
              Remember me
            </label>
          </div>
          <button
            type="button"
            onClick={handleLogin}
            className="flex w-3/4 justify-center p-2 rounded-3xl font-bold bg-gradient-to-r from-eGreen to-eGreenDark"
          >
            Login
          </button>
        </form>
      </div>
      <div className="h-screen flex items-center justify-center sm:">
        <img src={image} alt="placeholder" className="h-1/2 sm:block hidden" />
      </div>
    </div>
  );
}

export default Login;

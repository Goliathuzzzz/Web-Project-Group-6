import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import google from "../../assets/images/google_logo.png";
import image from "../../assets/images/login_page.png";
import { useGoogleLogin } from "@react-oauth/google";
import { Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState([]);
  const [username, setUsername] = useState("");
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
          localStorage.setItem("profile", JSON.stringify(res.data));
          navigate("/");
          window.location.reload();
        })
        .catch((err) => console.log("Error fetching user info:", err));
    }
  }, [user]);

  const handleLogin = () => {
    if (email && password) {
      console.log("Logging in:", { email, password, rememberMe });
      //login logic here
    } else {
      alert("Please enter both email and password.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex h-2/3 min-h-[400px]">
        <div className="flex flex-col bg-white max-w-[450px] min-w-[350px] lg:w-1/2 xl:w-1/2 sm:w-1/2 justify-center items-center h-[100%] w-1/4 font-Roboto mb-24 rounded-tl-sm rounded-bl-sm">
          <button
            onClick={gLogin}
            className="flex items-center justify-center border p-2 mb-2.5 w-3/4 rounded-sm border-borderBlue"
          >
            <img src={google} alt="Google Logo" className="w-6 h-6 mr-2" />
            <span className="text-gray-700 font-medium text-xs">
              Sign in with Google 🚀
            </span>
          </button>
          <p className="flex mb-2.5 font-bold">Or</p>
          <form
            className="w-full flex flex-col items-center"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              className="flex w-3/4 border mb-2.5 rounded-sm bg-inputGrey text-xs p-1 border-borderBlue pl-2 pt-2 pb-2"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <input
              className="flex w-3/4 border mb-2.5 rounded-sm bg-inputGrey text-xs p-1 border-borderBlue pl-2 pt-2 pb-2"
              placeholder="Password"
              type="password" // For security, use type="password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <div className="w-3/4 flex flex-row justify-start mb-2.5 items-center">
              <input
                type="checkbox"
                className="appearance-none h-3 w-3 rounded-sm border border-borderBlue checked:bg-borderBlue checked:after:content-['✓'] checked:after:text-xs flex items-center justify-center focus:ring-2 focus:ring-offset-1"
                id="remember-me"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              ></input>
              <label
                htmlFor="remember-me"
                className="pl-2 font-bold text-xs p-1"
              >
                Remember Me
              </label>
            </div>
            <button
              type="button"
              onClick={handleLogin}
              className="flex w-3/4 justify-center p-2 rounded-3xl font-bold bg-gradient-to-r from-eGreen to-eGreenDark hover:bg-darkGreen hover:text-white transition-all duration-500"
            >
              Login
            </button>
          </form>
          <p className="mt-4 text-xs">
            Don't have an account?{" "}
            <Link
              to="/registration"
              className="text-blue-500 font-bold hover:text-blue-900"
            >
              Sign up
            </Link>
          </p>
        </div>
        <div className="flex">
          <img
            src={image}
            alt="placeholder"
            className="sm:block hidden rounded-tr-sm rounded-br-sm bg-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;

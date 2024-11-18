import React, { useState } from "react";
import google from "../../assets/images/google_logo.png";
import register from "../../assets/images/registration_page.png";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegistration = () => {
    if (!name || !email || !confirmEmail || !password || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }
    if (email !== confirmEmail) {
      alert("Please provide the correct email.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Please provide the correct password.");
      return;
    }

    //simu successful registration
    console.log("Registered successfully:", { name, email });
    alert("Registration successful!");
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="flex flex-col bg-white max-w-[400px] min-w-[300px] lg:w-1/2 xl:w-1/2 sm:w-1/2 justify-center items-center h-1/2 w-1/4 font-Roboto">
        <button className="flex items-center justify-center border p-2 mb-2 w-3/4 rounded-sm border-borderBlue">
          <img src={google} alt="Google Logo" className="w-6 h-6 mr-2" />
          <span className="text-gray-700 font-medium text-xs">
            Continue with Google
          </span>
        </button>
        <p className="flex mb-2 font-bold">Or</p>
        <form
          className="w-full flex flex-col items-center"
          onSubmit={(e) => {
            e.preventDefault();
            handleRegistration();
          }}
        >
          <input
            className="flex w-3/4 border mb-3 p-[5px] rounded-sm bg-inputGrey text-xs border-borderBlue pl-2"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
          <input
            className="flex w-3/4 border mb-3 p-[5px] rounded-sm bg-inputGrey text-xs border-borderBlue pl-2"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <input
            className="flex w-3/4 border mb-3 p-[5px] rounded-sm bg-inputGrey text-xs border-borderBlue pl-2"
            placeholder="Confirm Email"
            value={confirmEmail}
            onChange={(e) => setConfirmEmail(e.target.value)}
          ></input>
          <input
            className="flex w-3/4 border mb-3 p-[5px] rounded-sm bg-inputGrey text-xs border-borderBlue pl-2"
            placeholder="Password"
            type="password" //security measure
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <input
            className="flex w-3/4 border mb-3 p-[5px] rounded-sm bg-inputGrey text-xs border-borderBlue pl-2"
            placeholder="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></input>
          <button
            type="submit"
            className="flex w-3/4 justify-center p-2 rounded-3xl font-bold bg-gradient-to-r from-eGreen to-eGreenDark mt-10"
          >
            Register
          </button>
        </form>
      </div>
      <div className="h-screen flex items-center justify-center">
        <img
          src={register}
          alt="placeholder"
          className="h-1/2 sm:block hidden"
        />
      </div>
    </div>
  );
}
export default Register;

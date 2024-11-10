import React, {useState} from 'react';
import yt from '../assets/images/yt.png';
import image from '../assets/images/login_page.png';

function Login() {

  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="flex flex-col bg-white w-1/2 justify-center items-center h-1/2 w-1/4 font-Roboto">
          <button className="flex items-center justify-center border p-2 mb-2 w-3/4 rounded-sm border-borderBlue">
            <img src={yt} alt="Google Logo" className="w-6 h-6 mr-2" />
            <span class="text-gray-700 font-medium text-xs">Continue with Google</span>
          </button>
        <p className="flex mb-2 font-bold">Or</p>
        <input className="flex w-3/4 border mb-2 rounded-sm bg-gray-200 text-xs p-1 border-borderBlue pl-2" placeholder="Username"></input>
        <input className="flex w-3/4 border mb-2 rounded-sm bg-gray-200 text-xs p-1 border-borderBlue p" placeholder="Password"></input>
        <div className="w-3/4 flex flex-row justify-start mb-2 items-center">
          <input type="checkbox" className="appearance-none h-3 w-3 rounded-sm border border-borderBlue"></input>
          <label className="pl-2 font-bold text-xs p-1">Remember me</label>
        </div>
        <button className="flex w-3/4 justify-center p-2 rounded-3xl font-bold bg-gradient-to-r from-eGreen to-eGreen_dark">Login</button>
      </div>
      <div className="h-screen flex items-center justify-center">
        <img src={image} alt="placeholder" className=" h-1/2"/>
      </div>
    </div>
  );
}
export default Login;

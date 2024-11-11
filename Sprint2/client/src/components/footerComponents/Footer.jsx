import AboutLinks from "../AboutLinks";
import ContactsLinks from "../ContactsLinks";
import LegalLinks from "../LegalLinks";
import SocialLinks from "../SocialLinks";
import logo from "../../assets/images/logo_footer.png";
import footerText from "./footerText";
import appStore from "../../assets/images/app_store.png";
import playStore from "../../assets/images/google_play.png";

export default function Footer() {
  return (
    <>
      <div className="relative flex flex-col md:flex-row justify-between px-12 py-6 pb-4 bg-gradient-to-b from-darkSlate to-customBlue">
        {/* Logo and links */}
        <div className="flex flex-col md:flex-row flex-1 justify-start space-x-8">
          {/* Logo and description */}
          <div className="flex flex-col items-start">
            <img
              src={logo}
              alt="Plug It company logo"
              className="h-10 w-auto"
            />
            <p className="text-white text-xs mt-2 w-48 font-Roboto">
              {footerText}
            </p>
          </div>

          {/* About links section */}
          <div className="flex flex-col items-start mt-4 md:mt-0">
            <h4 className="text-white text-base mb-2 font-Orbitron">
              About Us
            </h4>
            <AboutLinks itemClass="text-white text-sm hover:text-gray-300 transition duration-300 font-Roboto" />
          </div>

          {/* Contacts links section */}
          <div className="flex flex-col items-start mt-4 md:mt-0">
            <h4 className="text-white text-base mb-2 font-Orbitron">Contact</h4>
            <ContactsLinks itemClass="text-white text-sm hover:text-gray-300 transition duration-300 font-Roboto" />
          </div>
        </div>

        {/* Newsletter and socials */}
        <div className="flex flex-col items-center flex-1 mt-8 md:mt-0">
          <div className="w-full text-left ml-0 md:ml-24">
            <h4 className="text-white text-base mb-2 font-Orbitron">
              Order our newsletter
            </h4>
          </div>
          <form className="flex w-full max-w-sm">
            <input
              type="email"
              placeholder="Email address"
              className="flex-1 px-4 py-2 rounded-l bg-gray-200 text-black focus:outline-none font-Roboto"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-eGreen text-black rounded-r hover:bg-darkGreen hover:text-white transition duration-500 font-Roboto font-bold"
            >
              Submit
            </button>
          </form>

          {/* Social links section */}
          <div className="flex space-x-4 my-4 mt-6">
            <SocialLinks
              parentClass="flex space-x-6"
              itemClass="w-8 h-8 hover:opacity-80 transition duration-300"
            />
          </div>

          {/* Copyright text */}
          <div className="text-white text-center text-sm font-Roboto">
            &copy; {new Date().getFullYear()} Plug It. All rights reserved.
          </div>
        </div>

        {/* Legal and download sections */}
        <div className="flex flex-1 space-x-8 justify-start">
          {/* Legal links */}
          <div className="flex flex-col items-start">
            <h4 className="text-white text-base mb-2 font-Orbitron">Legal</h4>
            <LegalLinks itemClass="text-white text-sm hover:text-gray-300 transition duration-300 font-Roboto" />
          </div>

          {/* Download Our App Section */}
          <div className="flex flex-col items-start">
            <h4 className="text-white text-base mb-2 font-Orbitron">
              Download Our App
            </h4>
            <div className="flex space-x-4">
              <img
                src={appStore}
                alt="Download on the App Store"
                className="h-10"
              />
              <img
                src={playStore}
                alt="Get it on Google Play"
                className="h-10"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

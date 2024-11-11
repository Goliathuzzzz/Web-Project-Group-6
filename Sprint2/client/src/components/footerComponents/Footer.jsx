import AboutLinks from "../AboutLinks";
import ContactsLinks from "../ContactsLinks";
import LegalLinks from "../LegalLinks";
import logo from "../../assets/images/logo_footer.png";
import footerText from "./footerText";

export default function Footer() {
  return (
    <>
      <div className="relative flex items-center justify-between px-12 py-4 bg-gradient-to-b from-darkSlate to-customBlue mb-10">
        <div className="flex flex-col items-start">
          <img src={logo} alt="Plug It company logo" className="h-10 w-auto" />
          <p className="text-white text-xs mt-2 w-48 font-Roboto">{footerText}</p>
        </div>
        {/* About Links Section */}
        <div className="flex flex-col items-start">
          <h4 className="text-white text-base mb-2 font-Orbitron">About Us</h4>
          <AboutLinks itemClass="text-white text-sm hover:text-gray-300 transition duration-300 font-Roboto"/>
        </div>

        {/* Contacts Links Section */}
        <div className="flex flex-col items-start">
          <h4 className="text-white text-base mb-2 font-Orbitron">Contact</h4>
          <ContactsLinks itemClass="text-white text-sm hover:text-gray-300 transition duration-300 font-Roboto"/>
        </div>

        {/* Legal Links Section */}
        <div className="flex flex-col items-start">
          <h4 className="text-white text-base mb-2 font-Orbitron">Legal</h4>
          <LegalLinks itemClass="text-white text-sm hover:text-gray-300 transition duration-300 font-Roboto"/>
        </div>
      </div>
    </>
  );
}

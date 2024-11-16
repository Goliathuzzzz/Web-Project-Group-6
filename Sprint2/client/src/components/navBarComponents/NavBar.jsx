import { useState } from "react";
import logo from "../../assets/images/logo.png";
import userCircle from "../../assets/images/user.png";
import menuIcon from "../../assets/images/menu.png";
import PageLinks from "../PageLinks";
import Search from "../../assets/images/search.png";
import { Link } from "react-router-dom";

function NavBar({ profilePicture }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  return (
    <div className="relative flex items-center justify-between px-4 py-2 bg-gradient-to-b from-darkerBlue to-darkBlue mb-10 nav-phone:px-12">
      {/* Logo on the left */}
      <div className="flex items-center">
        <Link to={"/"}>
          <img src={logo} alt="Plug It company logo" className="h-10 w-auto" />
        </Link>
      </div>

      {/* Search bar visible only on medium and larger screens */}
      <div className="relative items-center w-1/4 mx-6 ml-20 hidden search-bar-bp:flex">
        <input
          type="text"
          name="query"
          placeholder="Search"
          className="w-full py-1 pl-10 pr-4 text-white rounded-full bg-searchBarBg focus:outline-none focus:ring-2 focus:ring-searchBarSelected shadow-inner-lg font-Roboto"
        />
        <img
          src={Search}
          alt="Search Icon"
          className="absolute left-3 h-5 w-5 text-gray-400 font-Roboto"
        />
      </div>

      {/* Page links visible on medium and larger screens */}
      <div className="hidden md:flex items-center space-x-6 ml-auto">
        <PageLinks
          parentClass="flex space-x-10"
          itemClass="text-white hover:text-gray-300 transition duration-300 font-Roboto"
        />
        <a href="#user-profile">
          <img
            src={profilePicture || userCircle}
            alt="User profile"
            className="h-8 w-auto rounded-full"
          />
        </a>
      </div>

      {/* User icon, log in button, and menu icon */}
      <div className="flex items-center space-x-4 sm:space-x-6 md:space-x-8">
        <div className="md:hidden">
          <img
            src={Search}
            alt="Search icon"
            className="h-8 w-auto cursor-pointer"
            onClick={toggleSearch}
          />
        </div>
        <button onClick={toggleMenu} className="md:hidden">
          <img src={menuIcon} alt="Menu icon" className="h-8 w-auto" />
        </button>
        <Link to="/login">
          <button className="bg-gradient-to-r from-eGreen to-darkGreen py-2 px-6 nav-phone:px-12 rounded-full hover:bg-darkGreen hover:text-white transition-all duration-500 font-bold text-1xl font-Roboto">
            Log In
          </button>
        </Link>
      </div>

      {/* Conditional rendering of search bar */}
      {searchOpen && (
        <div className="absolute top-full left-0 w-full bg-gradient-to-b from-darkerBlue to-darkBlue p-4 md:hidden">
          <input
            type="text"
            name="query"
            placeholder="Search"
            className="w-full py-2 px-4 text-white rounded-full bg-searchBarBg focus:outline-none focus:ring-2 focus:ring-searchBarSelected shadow-inner-lg font-Roboto"
          />
        </div>
      )}

      {/* Conditional rendering of PageLinks for smaller screens */}
      {menuOpen && (
        <div className="absolute top-14 left-0 w-full bg-gradient-to-b from-darkerBlue to-darkBlue md:hidden">
          <nav className="flex flex-col space-y-4 p-4">
            <PageLinks
              parentClass="flex flex-col space-y-4"
              itemClass="text-white hover:text-gray-300 transition duration-300 font-Roboto"
            />
            <a
              href="#user-profile"
              className="text-white font-Roboto hover:text-gray-300 transition duration-300"
            >
              Profile
            </a>
          </nav>
        </div>
      )}
    </div>
  );
}

export default NavBar;

import { useState } from "react";
import { Link } from "react-router-dom";
import {LOGO} from "../constants";

// Title component for display logo
const Title = () => (
  <Link to="/" className="font-bold text-yellow-400 px-4">
    <img
      className="w-16 md:w-24 px-2"
      src={LOGO}
      alt="Food Fire Logo"
      title="Food Fire"
    />
  </Link>
);

// Header component for header section: Logo, Nav Items
const Header = () => {
  // use useState for user logged in or logged out
  const [isLoggedin, setIsLoggedin] = useState(true);

  return (
    <div className="flex justify-between items-center py-2 border shadow-lg  sticky top-0 bg-white z-10">
      <Title />
      <div className="">
        <ul className="flex gap-2 md:gap-3 px-2 md:px-4 items-center text-sm md:text-md font-semibold text-gray-700">
          <Link to="/"><li>Home</li></Link>
          <Link to="/food"> <li>Food</li></Link>
          <Link to="/cocktail"> <li>Cocktail</li></Link>
          <Link to="/about" className="hidden md:block"><li>About</li></Link>
          <Link to="/contact" className="hidden md:block"><li>Contact</li></Link>
          <li>
            <i className="text-lg">🛒</i>
          </li>
          <li>
            {/* use conditional rendering for login and logout */}
            {isLoggedin ? (
              <button
                className="border text-white px-2 md:px-4 py-1 md:py-2 bg-gray-500 rounded-md"
                onClick={() => setIsLoggedin(false)}
              >
                Logout
              </button>
            ) : (
              <button 
              className="border text-white px-2 md:px-4 py-1 md:py-2 bg-gray-500 rounded-md"
              onClick={() => setIsLoggedin(true)}>
                Login
              </button>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
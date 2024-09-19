import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import LOGO from "../../assets/Logo.jpeg";
import ProfileDropdown from "../Auth/ProfileDropdown";
import { setToken } from "../../redux/slices/authSlice";
import { setUser } from "../../redux/slices/profileSlice";

// Title component for display logo
const Title = () => (
  <Link to="/" className="font-bold text-yellow-400 px-2 md:px-4">
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
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token) {
      dispatch(setToken(JSON.parse(token))); // Restore the token to Redux
    }

    if (storedUser) {
      dispatch(setUser(JSON.parse(storedUser))); // Restore the user to Redux
    }
  }, [dispatch]);

  // console.log("user", user)

  // Filter cart items for the logged-in user
  const userCartItems = cart?.filter((item) => item.userId === user?._id);

  console.log("userCartItems", userCartItems);

  return (
    <div className="flex justify-between items-center py-2 border shadow-lg sticky top-0 bg-white z-10">
      <Title />
      <div className="">
        <ul className="flex gap-2 md:gap-3 px-4 items-center text-sm md:text-md font-semibold text-gray-700">
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/about">
            <li>About</li>
          </Link>
          <Link to="/contact">
            <li>Contact</li>
          </Link>
          <li className="flex items-center">
            {/* Conditionally render Login/Logout buttons */}
            {user ? (
              <>
                <Link to="/cart">
                  <p className="text-lg">🛒</p>
                  {userCartItems?.length > 0 && (
                    <span className="absolute top-4 md:top-7 ml-4 font-bold text-gray-800 text-xs bg-yellow-500 flex w-4 h-4 items-center justify-center animate-bounce rounded-full">
                      {userCartItems?.length}
                    </span>
                  )}
                </Link>
                <ProfileDropdown />
              </>
            ) : (
              <button
                className="border text-white px-2 md:px-4 py-1 md:py-2 bg-gray-800 rounded-md"
                onClick={() => navigate("/")}
              >
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

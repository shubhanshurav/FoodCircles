import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import LOGO from "../../assets/Logo.jpeg";
import ProfileDropdown from "../Auth/ProfileDropdown";
// import { logout } from "../../services/operations/authAPI";
// import { setToken } from "../../redux/slices/authSlice";

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
  // console.log("cart", cart)

  const navigate = useNavigate();
  // const dispatch = useDispatch();

    // useEffect(() => {
    //   const token = localStorage.getItem("token");
    //   if (token) {
    //     dispatch(setToken(JSON.parse(token))); // Restore the token to Redux
    //   }
    // }, [dispatch]);

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
          <Link to="/cart">
            <p className="text-lg">🛒</p>
            {cart?.length > 0 && (
              <span className="absolute top-4 md:top-7 ml-4 font-bold text-gray-800 text-xs bg-yellow-500 flex w-4 h-4 items-center justify-center animate-bounce rounded-full">
                {cart?.length}
              </span>
            )}
          </Link>
          <li className="flex items-center">
            {/* Conditionally render Login/Logout buttons */}
            {user ? (
              <>
                {/* <button
                  className="border text-white px-2 md:px-4 py-1 md:py-2 bg-gray-800 rounded-md"
                  onClick={() => dispatch(logout(navigate))}
                >
                  Logout
                </button> */}
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

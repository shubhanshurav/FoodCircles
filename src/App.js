// src/App.js or src/routes.js
import React, { useEffect } from "react";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import About from "./components/common/About";
import Error from "./components/Error";
import Contact from "./components/common/Contact";
import RestaurantMenu from "./components/restaurent/RestaurantMenu";
import Profile from "./components/Profile";
import Dashboard from "./components/Dashboard";
import { createBrowserRouter, Outlet } from "react-router-dom";
import Restaurant from "./components/restaurent/Restaurant";
import Cart from "./components/cart/Cart";
import Checkout from "./components/cart/Checkout";
import OpenRoute from "./components/Auth/OpenRoute";
import PrivateRoute from "./components/Auth/PrivateRoute";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import ForgotPassword from "./components/Auth/ForgotPassword";
import UpdatePassword from "./components/Auth/UpdatePassword";
import VerifyEmail from "./components/Auth/VerifyEmail";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "./redux/slices/authSlice";
import MainDashboard from "./components/MainDashboard";

// AppLayout component to render Header, Footer, and Outlet for child components
const AppLayout = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.profile);

  // Use useEffect to restore token on app initialization
useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    dispatch(setToken(JSON.parse(token))); // Restore token to Redux
  }
}, [dispatch]);



  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

// Routes configuration
export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />, // Handle invalid paths
    children: [
      {
        path: "/",
        element: (
          <OpenRoute>
            <Login />
          </OpenRoute>
        ),
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "cart",
        element: (
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        ),
      },
      {
        path: "checkout",
        element: (
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        ),
      },
      {
        path: "restaurant",
        element: (
          <PrivateRoute>
            <Restaurant />
          </PrivateRoute>
        ),
      },
      {
        path: "restaurant/:resId",
        element: (
          <PrivateRoute>
            <RestaurantMenu />
          </PrivateRoute>
        ),
      },
      {
        path: "signup",
        element: (
          <OpenRoute>
            <Signup />
          </OpenRoute>
        ),
      },
      {
        path: "forgot-password",
        element: (
          <OpenRoute>
            <ForgotPassword />
          </OpenRoute>
        ),
      },
      {
        path: "update-password/:id",
        element: (
          <OpenRoute>
            <UpdatePassword />
          </OpenRoute>
        ),
      },
      {
        path: "verify-email",
        element: (
          <OpenRoute>
            <VerifyEmail />
          </OpenRoute>
        ),
      },
      // Private routes based on account type (CUSTOMER)
      {
        path: "dashboard",
        element: (
          <PrivateRoute>
            <MainDashboard />
          </PrivateRoute>
        ),
        children: [
          {
            path: "",
            element: <Dashboard />,
          },
          {
            path: "my-profile",
            element: <Profile />,
          },
        ],
      },
      // {
      //   path: "dashboard/my-profile",
      //   element: (
      //     <PrivateRoute>
      //       <Profile />
      //     </PrivateRoute>
      //   ),
      // },
    ],
  },
]);

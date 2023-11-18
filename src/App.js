import React from "react";
import Header from "./components/Header";
import Food from "./components/Food";
import Footer from "./components/Footer";
import About from "./components/About";
import Error from "./components/Error";
import Contact from "./components/Contact";
import Login from "./components/Login";
import RestaurantMenu from "./components/RestaurantMenu";
import Profile from "./components/Profile";
import { createBrowserRouter, Outlet } from "react-router-dom"; // for routing our page import createBrowserRouter and RouterProvider for providing router & Outlet for children component for nested routing
import Cocktail from "./components/Cocktail";
import Restaurant from "./components/Restaurant";

// AppLayout component to render: Header, Outlet(it contain children component like body, About, Restaurant Menu etc) and Footer Component
const AppLayout = () => {
  return (
    <React.Fragment>
      <Header />
      <Outlet />
      <Footer />
    </React.Fragment>
  );
};

// call createBrowserRouter for routing different pages
export const appRouter = createBrowserRouter([
  {
    path: "/", // show path for routing
    element: <AppLayout />, // show component for particular path
    errorElement: <Error />, // show error component for path is different
    children: [
      // show children component for routing
      {
        path: "/",
        element: <Restaurant />,
      },
      {
        path: "about",
        element: <About />,
        children: [{ // nested routing
          path: "profile",
          element: <Profile />,
        }]
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "cocktail",
        element: <Cocktail />,
      },
      {
        path: "food",
        element: <Food />,
      },
      {
        path: "/restaurant/:resId",
        element: <RestaurantMenu />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
]);


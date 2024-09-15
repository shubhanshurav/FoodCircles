import React from "react";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import About from "./components/common/About";
import Error from "./components/Error";
import Contact from "./components/common/Contact";
import Login from "./components/common/Login";
import RestaurantMenu from "./components/restaurent/RestaurantMenu";
import Profile from "./components/Profile";
import { createBrowserRouter, Outlet } from "react-router-dom"; // for routing our page import createBrowserRouter and RouterProvider for providing router & Outlet for children component for nested routing
import Restaurant from "./components/restaurent/Restaurant";
import Cart from "./components/cart/Cart";
import Checkout from "./components/cart/Checkout";
import { Provider } from "react-redux";
import { store } from './redux/store/Store';
// import ViewOrderDetail from "./components/ViewOrderDetail";

// AppLayout component to render: Header, Outlet(it contain children component like body, About, Restaurant Menu etc) and Footer Component
const AppLayout = () => {
  return (
    <React.Fragment>
      <Provider store={store}>
        <Header />
        <Outlet />
        <Footer />
      </Provider>
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
        children: [
          {
            // nested routing
            path: "profile",
            element: <Profile />,
          },
        ],
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
      {
        path: "/restaurant/:resId",
        element: <RestaurantMenu />,
      },
      // {
      //   path: "/restaurant/viewDetail/:resId",
      //   element: <ViewOrderDetail />,
      // },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
]);


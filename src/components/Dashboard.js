// src/components/Dashboard.js

import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { Outlet } from "react-router-dom";

const Dashboard = () => {
  const { user } = useSelector((state) => state.profile); // Get user details from redux store
  const navigate = useNavigate();

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-6">
        Welcome to Your Dashboard, {user?.firstName}!
      </h1>

      {/* Account Info Section */}
      <div className="bg-white shadow-md p-6 rounded-md max-w-lg mx-auto mb-8">
        <h2 className="text-2xl font-semibold text-gray-700">
          Account Type: {user?.accountType}
        </h2>
        <p className="text-gray-500 mt-2">Email: {user?.email}</p>
      </div>

      {/* Actions Section */}
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-4">
          What would you like to do?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center">
          <button
            onClick={() => navigate("my-profile")}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            View Profile
          </button>
          <button
            onClick={() => navigate("/restaurant")}
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
          >
            Browse Restaurants
          </button>
        </div>
      </div>

      {/* <Outlet /> */}
    </div>
  );
};

export default Dashboard;

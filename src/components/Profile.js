import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import {
  deleteProfile,
  updateDisplayPicture,
  updateProfile,
} from "../services/operations/SettingsAPI";
import { setLoading, setUser } from "../redux/slices/profileSlice";
import { getUserDetails } from "../services/operations/profileAPI"; 
import { logout } from "../services/operations/authAPI";
import { apiConnector } from "../services/apiConnector";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading } = useSelector((state) => state.profile); // Get user details from redux store
  const [profileData, setProfileData] = useState({
    name: user?.firstName || "",
    email: user?.email || "",
    accountType: user?.accountType || "",
    location: "",
    phone: "",
    joined: "",
  });
  const [profileImage, setProfileImage] = useState(user?.image || "");
  const [isEditing, setIsEditing] = useState(false);

  const { token } = useSelector((state) => state.auth); // Assuming token is stored in auth slice

  useEffect(() => {
    if (token) {
      // console.log("Token available: ", token); // Debugging
      dispatch(getUserDetails(token, navigate));
    }
  }, [dispatch, token, navigate]);


  // Handle profile picture change
  const handleProfileImageChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    dispatch(updateDisplayPicture(token, formData));
  };

  // Handle profile update (name, location, phone)
  const handleProfileUpdate = async () => {
    const formData = {
      firstName: profileData.name,
      location: profileData.location,
      phone: profileData.phone,
    };
    dispatch(updateProfile(token, formData));
    setIsEditing(false);
  };

  // Handle profile delete
  const handleDeleteProfile = async () => {
    dispatch(deleteProfile(token, navigate));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
        {/* Profile Image and Basic Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src={profileImage || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover shadow-lg"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {profileData.name}
              </h1>
              <p className="text-gray-600">{profileData.accountType}</p>
              <p className="text-sm text-gray-500">{profileData.email}</p>
            </div>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Change Profile Picture
            </label>
            <input
              type="file"
              className="mb-4"
              onChange={handleProfileImageChange}
            />
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
          </div>
        </div>

        {/* About and Details Section */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* About Section */}
          <div className="bg-gray-50 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">About</h2>
            {isEditing ? (
              <textarea
                className="w-full p-2 border border-gray-300 rounded"
                value={profileData.about}
                onChange={(e) =>
                  setProfileData({ ...profileData, about: e.target.value })
                }
              />
            ) : (
              <p className="text-gray-600">
                Experienced software engineer with a passion for developing
                innovative programs that expedite the efficiency and
                effectiveness of organizational success.
              </p>
            )}
          </div>

          {/* Details Section */}
          <div className="bg-gray-50 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Details
            </h2>
            {isEditing ? (
              <div>
                <input
                  type="text"
                  className="w-full p-2 mb-2 border border-gray-300 rounded"
                  placeholder="Location"
                  value={profileData.location}
                  onChange={(e) =>
                    setProfileData({ ...profileData, location: e.target.value })
                  }
                />
                <input
                  type="text"
                  className="w-full p-2 mb-2 border border-gray-300 rounded"
                  placeholder="Phone"
                  value={profileData.phone}
                  onChange={(e) =>
                    setProfileData({ ...profileData, phone: e.target.value })
                  }
                />
              </div>
            ) : (
              <ul className="text-gray-600">
                <li className="mb-2">
                  <span className="font-bold text-gray-800">Location:</span>{" "}
                  {profileData.location || "San Francisco, CA"}
                </li>
                <li className="mb-2">
                  <span className="font-bold text-gray-800">Phone:</span>{" "}
                  {profileData.phone || "(555) 123-4567"}
                </li>
                <li>
                  <span className="font-bold text-gray-800">Joined:</span>{" "}
                  {profileData.joined || "January 2021"}
                </li>
              </ul>
            )}
          </div>
        </div>

        {/* Save/Update/Delete Buttons */}
        {isEditing && (
          <div className="mt-6 text-right">
            <button
              className="px-4 py-2 bg-green-600 text-white rounded-lg mr-2 hover:bg-green-700"
              onClick={handleProfileUpdate}
            >
              Save Changes
            </button>
            <button
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              onClick={handleDeleteProfile}
            >
              Delete Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

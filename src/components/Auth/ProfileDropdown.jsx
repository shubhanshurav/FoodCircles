import { useRef, useState } from "react";
import { AiOutlineCaretDown } from "react-icons/ai";
import { VscDashboard, VscSignOut } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import useOnClickOutside from "../../hooks/useOnClickOutside";
import { logout } from "../../services/operations/authAPI";

export default function ProfileDropdown() {
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useOnClickOutside(ref, () => setOpen(false));

  if (!user) return null;

  return (
    <div className="relative">
      {/* Button to toggle dropdown */}
      <button
        className="flex items-center gap-x-1"
        onClick={() => setOpen(!open)}
      >
        <img
          src={user?.image}
          alt={`profile-${user?.firstName}`}
          className="aspect-square w-[30px] rounded-full object-cover"
        />
        <AiOutlineCaretDown className="text-sm text-gray-800" />
      </button>

      {open && (
        <div
          ref={ref}
          className="absolute top-[118%] right-0 z-[1000] divide-y-[1px] divide-gray-700 overflow-hidden rounded-md border-[1px] border-gray-700 bg-gray-800"
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the dropdown
        >
          {/* Dashboard Link */}
          <Link to="dashboard" onClick={() => setOpen(false)}>
            <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-gray-100 hover:bg-gray-700 hover:text-gray-25">
              <VscDashboard className="text-lg" />
              Dashboard
            </div>
          </Link>

          {/* Profile Link */}
          <Link to="dashboard/my-profile" onClick={() => setOpen(false)}>
            <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-gray-100 hover:bg-gray-700 hover:text-gray-25">
              <VscDashboard className="text-lg" />
              Profile
            </div>
          </Link>

          {/* Logout */}
          <div
            onClick={() => {
              dispatch(logout(navigate)); // Dispatch logout and redirect
              setOpen(false); // Close the dropdown after logging out
            }}
            className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-gray-100 hover:bg-gray-700 hover:text-gray-25 cursor-pointer"
          >
            <VscSignOut className="text-lg" />
            Logout
          </div>
        </div>
      )}
    </div>
  );
}

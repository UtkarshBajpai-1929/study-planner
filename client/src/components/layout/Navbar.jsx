import { useState } from "react";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import UserMenu from "../UserMenu";
import { IoReorderThreeOutline } from "react-icons/io5";

const Navbar = ({ onMenuClick }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const { user, isAuthenticated } = useSelector((state) => state.auth);

  return (
    <header className="relative z-20 flex h-16 items-center justify-between gap-3 bg-white px-4 shadow sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            aria-label="Open navigation"
            onClick={onMenuClick}
            className="rounded p-1 text-3xl text-gray-700 hover:bg-gray-100 md:hidden"
          >
            <IoReorderThreeOutline />
          </button>

          <h2 className="truncate text-base font-semibold text-gray-900 sm:text-lg">
            {isAuthenticated ? `Welcome ${user?.fullname || user?.username || ""}` : "AI Study Planner"}
          </h2>
        </div>

        <div className="relative shrink-0">

          {isAuthenticated && user?.profile ? (
            <img
              src={user.profile}
              alt="profile"
              className="h-10 w-10 rounded-full object-cover"
              onClick={() => setMenuOpen(!menuOpen)}
            />
          ) : (
            <FaUserCircle
              size={28}
              className="cursor-pointer"
              onClick={() => setMenuOpen(!menuOpen)}
            />
          )}

          {menuOpen && (
            <>
              {isAuthenticated ? (
                <UserMenu user={user} />
              ) : (
                <div className="absolute right-0 mt-3 w-40 bg-white shadow-lg rounded p-3">
                  <Link
                    to="/login"
                    className="block hover:bg-gray-100 p-2 rounded"
                  >
                    Login
                  </Link>
                </div>
              )}
            </>
          )}

        </div>
    </header>
  );
};

export default Navbar;

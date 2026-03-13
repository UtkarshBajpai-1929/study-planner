import { useState } from "react";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import UserMenu from "../UserMenu";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const { user, isAuthenticated } = useSelector((state) => state.auth);


  return (
    <div className="h-16 bg-white shadow flex items-center justify-between px-6 relative">
      <h2 className="text-lg font-semibold">AI Study Planner</h2>
      {
        isAuthenticated ?(<h2 className="text-lg font-semibold text-gray-900">Welcome {user.fullname}</h2>):null
      }
      <div className="relative">
         {
        isAuthenticated && user.profile ? (
          <img src={user.profile} className="w-10 h-10 rounded-full cursor-pointer"
         onClick={()=>setOpen(!open)} />
        ) : (
          <FaUserCircle
          size={28}
          className="cursor-pointer"
          onClick={() => setOpen(!open)}
        />
        )
      }
        
        {open && (
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
    </div>
  );
};

export default Navbar;
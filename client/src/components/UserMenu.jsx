import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/authSlice";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { updateProfilePic } from "../features/authSlice";
const UserMenu = ({ user }) => {
  const dispatch = useDispatch();
  const {profileUploading} = useSelector(state => state.auth);
    const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(updateProfilePic(file));
    }
  };
  return (
    <div className="absolute right-0 top-12 w-64 bg-white shadow-lg rounded-lg p-4 z-50">
      
      <div className="flex flex-col items-center justify-center">
        {/* Avatar */}
        <div>
          {
            user.profile ? (<img src={user.profile} className="w-40 h-40 rounded-full"/>) : (<div className="text-9xl text-center text-gray-500">
          <FaUserCircle />
        </div>
        )
          }
          
            <label
          htmlFor="profileUpload"
        > <p className="text-blue-600 text-center cursor-pointer">{profileUploading ? "Uploading..." : "Update Profile"}</p>
        </label>
        <input
          type="file"
          id="profileUpload"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
        </div>

        {/* User info */}
        <div>
          <p className="font-semibold text-center">{user?.username}</p>
          <p className="text-sm text-gray-500 text-center">{user?.email}</p>
          <p className="text-sm text-gray-500 text-center">{user?.fullname}</p>
        </div>
      </div>

      <hr className="my-2" />

      <button
        onClick={() => dispatch(logout())}
        className="w-full text-red-500 text-center hover:bg-gray-100 p-2 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default UserMenu;
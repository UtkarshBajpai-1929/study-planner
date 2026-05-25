import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/authSlice";
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
    <div className="absolute right-0 top-12 z-50 w-[min(16rem,calc(100vw-2rem))] rounded-lg bg-white p-4 shadow-lg">
      
      <div className="flex flex-col items-center justify-center">
        {/* Avatar */}
        <div>
          {
            user.profile ? (<img src={user.profile} alt="Profile" className="h-32 w-32 rounded-full object-cover sm:h-40 sm:w-40"/>) : (<div className="text-8xl text-center text-gray-500 sm:text-9xl">
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
          <p className="text-center font-semibold">{user?.username}</p>
          <p className="break-all text-center text-sm text-gray-500">{user?.email}</p>
          <p className="text-center text-sm text-gray-500">{user?.fullname}</p>
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

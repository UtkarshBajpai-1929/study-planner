import React from "react";
import { useNavigate } from "react-router-dom";

const EmptyState = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center">
      
      <img
        src="https://cdn-icons-png.flaticon.com/512/7486/7486754.png"
        alt="No Data"
        className="w-40 mb-6 opacity-80"
      />

      <h2 className="text-2xl font-semibold text-gray-700">
        Nothing here yet
      </h2>

      <p className="text-gray-500 mt-2 max-w-md">
        Looks like you haven't created anything yet. Start by adding your first item.
      </p>

      <button
      onClick={()=>navigate("/goal")}
      className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
        Create Now
      </button>

    </div>
  );
};

export default EmptyState;
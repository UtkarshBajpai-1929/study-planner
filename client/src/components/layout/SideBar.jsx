import { Link } from "react-router-dom";
import React, { useState } from "react";
const SideBar = () => {
  return (
    <div className="w-64 bg-gray-900 text-white p-5">
      <h1 className="text-2xl font-bold mb-8">Study Planner</h1>

      <nav className="flex flex-col gap-4">
        <Link to="/">Dashboard</Link>
       <hr />
        <Link to="/subjects">Subjects</Link>
         <hr />
          <Link to="/goal">Goals</Link>
        <hr />
        <Link to="/study-plan">Study Plan</Link>
         <hr />
        <Link to="/analytics">Analytics</Link>
          <hr />
      </nav>
    </div>
  );
};

export default SideBar;
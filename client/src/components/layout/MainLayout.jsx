import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import Navbar from "./Navbar";
import React from "react";
const MainLayout = () => {
  return (
    <div className="flex h-screen">
      <SideBar />

      <div className="flex flex-col flex-1">
        <Navbar/>

        <main className="p-6 bg-gray-100 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
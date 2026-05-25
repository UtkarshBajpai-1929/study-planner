import { Link, useLocation } from "react-router-dom";
import React, { useEffect } from "react";
import { IoClose } from "react-icons/io5";

const navItems = [
  { to: "/", label: "Dashboard" },
  { to: "/subjects", label: "Subjects" },
  { to: "/goal", label: "Goals" },
  { to: "/study-plan", label: "Study Plan" },
  { to: "/analytics", label: "Analytics" }
];

const SideBar = ({ isOpen = false, onClose }) => {
  const location = useLocation();

  useEffect(() => {
    onClose?.();
  }, [location.pathname, onClose]);

  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={onClose}
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-gray-900 text-white shadow-xl transition-transform duration-200 md:static md:z-auto md:translate-x-0 md:shadow-none ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-white/10 px-5">
          <h1 className="text-lg font-semibold">AI Study Planner</h1>
          <button
            type="button"
            aria-label="Close navigation"
            onClick={onClose}
            className="rounded p-1 text-2xl hover:bg-white/10 md:hidden"
          >
            <IoClose />
          </button>
        </div>

        <nav className="flex flex-col p-3">
          {navItems.map((item) => {
            const active = location.pathname === item.to;

            return (
              <Link
                key={item.to}
                to={item.to}
                className={`rounded px-3 py-3 text-sm font-medium transition hover:bg-white/10 ${
                  active ? "bg-white/15 text-white" : "text-gray-200"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default SideBar;

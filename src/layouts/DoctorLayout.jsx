import { useState } from "react";

import { signOut } from "firebase/auth";

import {
  auth
} from "../firebase/config";

import {
  NavLink,
  Outlet,
  useNavigate
} from "react-router-dom";

import {
  FaBars,
  FaTimes,
  FaUserMd,
  FaCalendarCheck,
  FaFilePrescription
} from "react-icons/fa";

function DoctorLayout() {

  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const handleLogout = async () => {

    try {

      await signOut(auth);

      navigate("/login");

    } catch (error) {

      alert(error.message);

    }

  };

  const menuItems = [

    {
      title: "Dashboard",
      icon: <FaUserMd />,
      path: "/doctor/dashboard"
    },

    {
      title: "Appointments",
      icon: <FaCalendarCheck />,
      path: "/doctor/appointments"
    },

    {
      title: "Prescriptions",
      icon: <FaFilePrescription />,
      path: "/doctor/prescriptions"
    }

  ];

  return (

    <div className="min-h-screen flex bg-gradient-to-br from-gray-100 to-green-50">

      {/* OVERLAY */}
      {sidebarOpen && (

        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden"
          onClick={() =>
            setSidebarOpen(false)
          }
        />

      )}

      {/* SIDEBAR */}
      <div
        className={`
          fixed top-0 left-0 h-screen w-72
          overflow-y-auto
          bg-gradient-to-b from-green-900 to-green-700
          text-white p-6 shadow-2xl z-50
          transform transition-transform duration-300

          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >

        {/* MOBILE CLOSE */}
        <div className="flex justify-between items-center lg:hidden">

          <h1 className="text-2xl font-bold">

            Menu

          </h1>

          <button
            onClick={() =>
              setSidebarOpen(false)
            }
          >

            <FaTimes size={24} />

          </button>

        </div>

        {/* LOGO */}
        <div className="mt-6 lg:mt-0">

          <h1 className="text-3xl font-bold">

            Doctor Panel

          </h1>

          <p className="text-green-200 mt-2">

            Ibrahim Clinic

          </p>

        </div>

        {/* MENU */}
        <div className="mt-10 space-y-3">

          {menuItems.map((item, index) => (

            <NavLink
              key={index}
              to={item.path}
              onClick={() =>
                setSidebarOpen(false)
              }
              className={({ isActive }) => `
                flex items-center gap-4
                w-full text-left
                p-4 rounded-xl
                transition-all duration-200

                ${
                  isActive
                    ? "bg-white text-green-800 font-bold shadow-lg"
                    : "hover:bg-green-600"
                }
              `}
            >

              <span className="text-xl">

                {item.icon}

              </span>

              <span className="font-medium">

                {item.title}

              </span>

            </NavLink>

          ))}

        </div>

      </div>

      {/* MAIN */}
      <div className="flex-1 ml-0 lg:ml-72">

        {/* NAVBAR */}
        <div className="bg-white shadow-md p-5 flex justify-between items-center sticky top-0 z-30">

          <div className="flex items-center gap-4">

            {/* HAMBURGER */}
            <button
              className="lg:hidden"
              onClick={() =>
                setSidebarOpen(true)
              }
            >

              <FaBars size={24} />

            </button>

            <div>

              <h2 className="text-2xl font-bold text-gray-800">

                Doctor Dashboard

              </h2>

              <p className="text-gray-500">

                Consultation Panel

              </p>

            </div>

          </div>

          {/* LOGOUT */}
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg"
          >

            Logout

          </button>

        </div>

        {/* PAGE */}
        <div className="p-4 md:p-6">

          <Outlet />

        </div>

      </div>

    </div>

  );

}

export default DoctorLayout;
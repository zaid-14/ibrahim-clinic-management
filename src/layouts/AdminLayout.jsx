import { useState } from "react";

import { signOut } from "firebase/auth";

import {
  auth
} from "../firebase/config";

import {
  useNavigate
} from "react-router-dom";

import {
  useAuth
} from "../context/AuthContext";

import {
  FaBars,
  FaTimes,
  FaTachometerAlt,
  FaCalendarCheck,
  FaUsers,
  FaClipboardList,
  FaFilePrescription,
  FaBell
} from "react-icons/fa";

function AdminLayout({ children }) {

  const navigate = useNavigate();

  const { userData } = useAuth();

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
      icon: <FaTachometerAlt />,
      action: () =>
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        })
    },

    {
      title: "Appointments",
      icon: <FaCalendarCheck />,
      action: () =>
        document
          .getElementById("appointments")
          ?.scrollIntoView({
            behavior: "smooth"
          })
    },

    {
      title: "Patients",
      icon: <FaUsers />,
      action: () =>
        document
          .getElementById("patients")
          ?.scrollIntoView({
            behavior: "smooth"
          })
    },

    {
      title: "Queue",
      icon: <FaClipboardList />,
      action: () =>
        document
          .getElementById("queue")
          ?.scrollIntoView({
            behavior: "smooth"
          })
    },

    {
      title: "Prescriptions",
      icon: <FaFilePrescription />,
      action: () =>
        document
          .getElementById("prescriptions")
          ?.scrollIntoView({
            behavior: "smooth"
          })
    },

    {
      title: "Notifications",
      icon: <FaBell />,
      action: () =>
        document
          .getElementById("notifications")
          ?.scrollIntoView({
            behavior: "smooth"
          })
    }

  ];

  return (

    <div className="min-h-screen flex bg-gradient-to-br from-gray-100 to-green-50">

      {/* MOBILE OVERLAY */}
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

        {/* CLOSE BUTTON MOBILE */}
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

            IBRAHIM CLINIC

          </h1>

          <p className="text-green-200 mt-2">

            Management System

          </p>

        </div>

        {/* MENU */}
        <div className="mt-10 space-y-3">

          {menuItems.map((item, index) => (

            <button
              key={index}
              onClick={() => {

                item.action();

                setSidebarOpen(false);

              }}
              className="
                flex items-center gap-4
                w-full text-left
                p-4 rounded-xl
                hover:bg-green-600
                transition-all duration-200
              "
            >

              <span className="text-xl">

                {item.icon}

              </span>

              <span className="font-medium">

                {item.title}

              </span>

            </button>

          ))}

        </div>

      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 ml-0 lg:ml-72">

        {/* NAVBAR */}
        <div className="bg-white shadow-md p-5 flex justify-between items-center sticky top-0 z-30">

          {/* LEFT */}
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

                Admin Dashboard

              </h2>

              <p className="text-gray-500">

                Welcome, {userData?.name}

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

        {/* PAGE CONTENT */}
        <div className="p-4 md:p-6">

          {children}

        </div>

      </div>

    </div>

  );

}

export default AdminLayout;
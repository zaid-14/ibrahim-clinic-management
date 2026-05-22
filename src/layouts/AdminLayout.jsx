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

function AdminLayout({ children }) {

  const navigate = useNavigate();

  const { userData } = useAuth();

  const handleLogout = async () => {

    try {

      await signOut(auth);

      navigate("/login");

    } catch (error) {

      alert(error.message);

    }

  };

  return (

    <div className="min-h-screen flex bg-gradient-to-br from-gray-100 to-green-50">

      {/* SIDEBAR */}
      <div className="w-72 bg-gradient-to-b from-green-900 to-green-700 text-white p-6 shadow-2xl">

        <h1 className="text-2xl font-bold">

          IBRAHIM CLINIC

        </h1>

        <p className="text-sm mt-1 text-green-200">

          Management System

        </p>

        {/* MENU */}
        <div className="mt-10 space-y-4">

          <button className="block w-full text-left hover:bg-green-700 p-3 rounded-lg">

            Dashboard

          </button>

          <button className="block w-full text-left hover:bg-green-700 p-3 rounded-lg">

            Appointments

          </button>

          <button className="block w-full text-left hover:bg-green-700 p-3 rounded-lg">

            Patients

          </button>

          <button className="block w-full text-left hover:bg-green-700 p-3 rounded-lg">

            Queue System

          </button>

          <button className="block w-full text-left hover:bg-green-700 p-3 rounded-lg">

            Prescriptions

          </button>

        </div>

      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1">

        {/* NAVBAR */}
        <div className="bg-white shadow-md p-5 flex justify-between items-center sticky top-0 z-10">

          <div>

            <h2 className="text-2xl font-bold text-gray-800">

              Admin Dashboard

            </h2>

            <p className="text-gray-500">

              Welcome, {userData?.name}

            </p>

          </div>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg"
          >

            Logout

          </button>

        </div>

        {/* PAGE CONTENT */}
        <div className="p-6">

          {children}

        </div>

      </div>

    </div>

  );

}

export default AdminLayout;
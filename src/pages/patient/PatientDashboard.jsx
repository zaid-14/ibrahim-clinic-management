import {
  signOut
} from "firebase/auth";

import {
  auth
} from "../../firebase/config";

import {
  useNavigate
} from "react-router-dom";

import {
  useAuth
} from "../../context/AuthContext";

import BookAppointment from "./BookAppointment";

function PatientDashboard() {

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

    <div className="min-h-screen bg-gray-100">

      {/* NAVBAR */}
      <div className="bg-green-700 text-white p-5 flex justify-between items-center">

        <div>

          <h1 className="text-2xl font-bold">

            IBRAHIM CLINIC

          </h1>

          <p className="text-green-100">

            Welcome, {userData?.name}

          </p>

        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-lg"
        >

          Logout

        </button>

      </div>

      {/* CONTENT */}
      <div className="p-6">

        <BookAppointment />

      </div>

    </div>

  );

}

export default PatientDashboard;
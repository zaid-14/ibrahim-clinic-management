import { useEffect, useState } from "react";

import {
  FaHeartbeat,
  FaCalendarCheck
} from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";

import {
  signOut
} from "firebase/auth";

import {
  auth,
  db
} from "../../firebase/config";

import {
  useNavigate
} from "react-router-dom";

import {
  collection,
  onSnapshot
} from "firebase/firestore";

import BookAppointment from "./BookAppointment";

function PatientDashboard() {

  const { userData } =
    useAuth();

  const navigate =
    useNavigate();

  const [
    appointments,
    setAppointments
  ] = useState([]);

  // LOGOUT
  const handleLogout =
    async () => {

      try {

        await signOut(auth);

        navigate("/login");

      } catch (error) {

        alert(error.message);

      }

    };

  // LIVE APPOINTMENTS
  useEffect(() => {

    if (!userData) return;

    const unsubscribe =
      onSnapshot(
        collection(
          db,
          "appointments"
        ),
        (snapshot) => {

          const patientAppointments =
            snapshot.docs
              .map((doc) => ({
                id: doc.id,
                ...doc.data()
              }))
              .filter(
                (appointment) =>
                  appointment.patientEmail ===
                  userData?.email
              );

          setAppointments(
            patientAppointments
          );

        }
      );

    return () => unsubscribe();

  }, [userData]);

  // LATEST APPOINTMENT
  const latestAppointment =
    appointments[
      appointments.length - 1
    ];

  return (

    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white p-4 md:p-8">

      {/* WELCOME BANNER */}
      <div className="bg-gradient-to-r from-green-700 to-green-600 text-white rounded-3xl p-8 shadow-xl">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

          {/* LEFT */}
          <div>

            <h1 className="text-4xl font-bold">

              Welcome,
              {" "}
              {userData?.name}

            </h1>

            <p className="mt-3 text-green-100 text-lg">

              Ibrahim Clinic Patient Portal

            </p>

          </div>

          {/* RIGHT */}
          <button
            onClick={handleLogout}
            className="
              bg-white text-green-700
              hover:bg-green-100
              px-6 py-3 rounded-xl
              font-semibold
              transition-all duration-200
            "
          >

            Logout

          </button>

        </div>

      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">

        {/* LEFT */}
        <div>

          <BookAppointment />

        </div>

        {/* RIGHT */}
        <div className="space-y-8">

          {/* APPOINTMENT STATUS */}
          <div className="bg-white rounded-2xl shadow-md p-6">

            <div className="flex items-center gap-3">

              <FaCalendarCheck className="text-green-700 text-2xl" />

              <h2 className="text-2xl font-bold text-gray-800">

                Appointment Status

              </h2>

            </div>

            <div className="mt-6">

              {!latestAppointment ? (

                <p className="text-gray-500">

                  No appointments booked yet.

                </p>

              ) : (

                <div className="border rounded-xl p-4">

                  <div className="flex justify-between items-center">

                    <div>

                      <h3 className="font-bold text-lg">

                        {latestAppointment.date}

                      </h3>

                      <p className="text-gray-500">

                        {latestAppointment.time}

                      </p>

                    </div>

                    <span
                      className={`
                        px-4 py-2 rounded-full text-sm font-semibold

                        ${
                          latestAppointment.status ===
                          "approved"
                            ? "bg-green-100 text-green-700"
                            : latestAppointment.status ===
                              "rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }
                      `}
                    >

                      {
                        latestAppointment.status ===
                        "approved"
                          ? "Confirmed"
                          : latestAppointment.status ===
                            "rejected"
                          ? "Rejected"
                          : "Pending Approval"
                      }

                    </span>

                  </div>

                </div>

              )}

            </div>

          </div>

          {/* CLINIC TIMINGS */}
          <div className="bg-white rounded-2xl shadow-md p-6">

            <h2 className="text-2xl font-bold text-gray-800">

              Clinic Timings

            </h2>

            <div className="mt-6 space-y-4">

              <div className="flex justify-between">

                <span className="text-gray-600">

                  Morning

                </span>

                <span className="font-semibold">

                  10:00 AM – 2:00 PM

                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-gray-600">

                  Evening

                </span>

                <span className="font-semibold">

                  6:00 PM – 11:00 PM

                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-gray-600">

                  Sunday

                </span>

                <span className="text-red-500 font-semibold">

                  Closed

                </span>

              </div>

            </div>

          </div>

          {/* HEALTH TIPS */}
          <div className="bg-white rounded-2xl shadow-md p-6">

            <div className="flex items-center gap-3">

              <FaHeartbeat className="text-green-700 text-2xl" />

              <h2 className="text-2xl font-bold text-gray-800">

                Health Tips

              </h2>

            </div>

            <ul className="mt-6 space-y-3 text-gray-600">

              <li>
                • Drink plenty of water daily
              </li>

              <li>
                • Avoid oily and junk food
              </li>

              <li>
                • Maintain proper sleep schedule
              </li>

              <li>
                • Exercise regularly
              </li>

              <li>
                • Follow doctor’s advice carefully
              </li>

            </ul>

          </div>

        </div>

      </div>

    </div>

  );

}

export default PatientDashboard;
import { useEffect, useState } from "react";

import {
  collection,
  onSnapshot
} from "firebase/firestore";

import {
  db
} from "../../firebase/config";

import DashboardCard from "../../components/dashboard/DashboardCard";

import {
  FaUsers,
  FaCalendarCheck,
  FaClipboardList,
  FaBell
} from "react-icons/fa";

function DashboardPage() {

  const [totalPatients, setTotalPatients] =
    useState(0);

  const [
    todayAppointments,
    setTodayAppointments
  ] = useState(0);

  const [queueCount, setQueueCount] =
    useState(0);

  const [notifications, setNotifications] =
    useState([]);

  // LIVE DASHBOARD
  useEffect(() => {

    // USERS
    const unsubscribeUsers =
      onSnapshot(
        collection(db, "users"),
        (snapshot) => {

          const patients =
            snapshot.docs.filter(
              (doc) =>
                doc.data().role === "patient"
            );

          setTotalPatients(
            patients.length
          );

        }
      );

    // APPOINTMENTS
    const unsubscribeAppointments =
      onSnapshot(
        collection(db, "appointments"),
        (snapshot) => {

          const today =
            new Date()
              .toISOString()
              .split("T")[0];

          const todayData =
            snapshot.docs.filter(
              (doc) =>
                doc.data().date === today
            );

          setTodayAppointments(
            todayData.length
          );

        }
      );

    // QUEUE
    const unsubscribeQueue =
      onSnapshot(
        collection(db, "queueTokens"),
        (snapshot) => {

          const activeQueue =
            snapshot.docs.filter(
              (doc) =>
                doc.data().status !==
                "completed"
            );

          setQueueCount(
            activeQueue.length
          );

        }
      );

    // NOTIFICATIONS
    const unsubscribeNotifications =
      onSnapshot(
        collection(db, "notifications"),
        (snapshot) => {

          const notificationData =
            snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data()
            }));

          setNotifications(
            notificationData.slice(0, 5)
          );

        }
      );

    return () => {

      unsubscribeUsers();

      unsubscribeAppointments();

      unsubscribeQueue();

      unsubscribeNotifications();

    };

  }, []);

  return (

    <div>

      {/* PAGE HEADER */}
      <div>

        <h1 className="text-4xl font-bold text-gray-800">

          Dashboard Overview

        </h1>

        <p className="text-gray-500 mt-2">

          Welcome to Ibrahim Clinic Management System

        </p>

      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

        <DashboardCard
          title="Total Patients"
          value={totalPatients}
          color="text-green-700"
          icon={<FaUsers />}
        />

        <DashboardCard
          title="Today's Appointments"
          value={todayAppointments}
          color="text-blue-600"
          icon={<FaCalendarCheck />}
        />

        <DashboardCard
          title="Queue Tokens"
          value={queueCount}
          color="text-orange-500"
          icon={<FaClipboardList />}
        />

      </div>

      {/* QUICK ACTIONS + NOTIFICATIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">

        {/* QUICK ACTIONS */}
        <div className="bg-white rounded-2xl shadow-md p-6">

          <h2 className="text-2xl font-bold text-gray-800">

            Quick Actions

          </h2>

          <div className="grid grid-cols-2 gap-4 mt-6">

            <button
              className="
                bg-green-700 hover:bg-green-800
                text-white p-4 rounded-xl
                font-semibold
              "
            >

              Add Patient

            </button>

            <button
              className="
                bg-blue-600 hover:bg-blue-700
                text-white p-4 rounded-xl
                font-semibold
              "
            >

              Book Appointment

            </button>

            <button
              className="
                bg-orange-500 hover:bg-orange-600
                text-white p-4 rounded-xl
                font-semibold
              "
            >

              Generate Token

            </button>

            <button
              className="
                bg-purple-600 hover:bg-purple-700
                text-white p-4 rounded-xl
                font-semibold
              "
            >

              Create Prescription

            </button>

          </div>

        </div>

        {/* NOTIFICATIONS */}
        <div className="bg-white rounded-2xl shadow-md p-6">

          <div className="flex items-center gap-3">

            <FaBell className="text-green-700 text-2xl" />

            <h2 className="text-2xl font-bold text-gray-800">

              Latest Activity

            </h2>

          </div>

          <div className="mt-6 space-y-4">

            {notifications.length === 0 ? (

              <p className="text-gray-500">

                No activity yet.

              </p>

            ) : (

              notifications.map((notification) => (

                <div
                  key={notification.id}
                  className="
                    border-l-4 border-green-700
                    bg-gray-50
                    p-4 rounded-lg
                  "
                >

                  <h3 className="font-bold text-green-700">

                    {notification.title}

                  </h3>

                  <p className="text-gray-600 mt-1">

                    {notification.message}

                  </p>

                </div>

              ))

            )}

          </div>

        </div>

      </div>

      {/* CLINIC INFO */}
      <div className="bg-white rounded-2xl shadow-md p-6 mt-10">

        <h2 className="text-2xl font-bold text-gray-800">

          Clinic Information

        </h2>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">

          <div>

            <p className="text-gray-500">

              Clinic Name

            </p>

            <h3 className="text-xl font-bold text-gray-800 mt-1">

              Ibrahim Clinic

            </h3>

          </div>

          <div>

            <p className="text-gray-500">

              Doctor

            </p>

            <h3 className="text-xl font-bold text-gray-800 mt-1">

              Dr. Aftab A. Khan (B.U.M.S.)

            </h3>

          </div>

          <div>

            <p className="text-gray-500">

              Morning Timing

            </p>

            <h3 className="text-xl font-bold text-gray-800 mt-1">

              10:00 AM – 2:00 PM

            </h3>

          </div>

          <div>

            <p className="text-gray-500">

              Evening Timing

            </p>

            <h3 className="text-xl font-bold text-gray-800 mt-1">

              6:00 PM – 11:00 PM

            </h3>

          </div>

        </div>

      </div>

    </div>

  );

}

export default DashboardPage;
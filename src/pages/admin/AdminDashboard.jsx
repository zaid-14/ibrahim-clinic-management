import AdminLayout from "../../layouts/AdminLayout";
import AppointmentList from "../../components/appointments/AppointmentList";
import QueueManagement from "../../components/queue/QueueManagement";
import MedicalRecords from "../../components/patients/MedicalRecords";
import PrescriptionGenerator from "../../components/prescriptions/PrescriptionGenerator";
import AppointmentCalendar from "../../components/appointments/AppointmentCalendar";
import PatientSearch from "../../components/patients/PatientSearch";
import FollowUpManagement from "../../components/patients/FollowUpManagement";
import NotificationsPanel from "../../components/dashboard/NotificationsPanel";
import DashboardCard from "../../components/dashboard/DashboardCard";

import { FaUsers, FaCalendarCheck, FaClipboardList } from "react-icons/fa";
import { useEffect, useState } from "react";

import { collection, onSnapshot } from "firebase/firestore";

import { db } from "../../firebase/config";

function AdminDashboard() {
  const [totalPatients, setTotalPatients] = useState(0);
  const [todayAppointments, setTodayAppointments] = useState(0);
  const [queueCount, setQueueCount] = useState(0);

  useEffect(() => {

  // USERS LIVE
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

  // APPOINTMENTS LIVE
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

  // QUEUE LIVE
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

  // CLEANUP
  return () => {

    unsubscribeUsers();

    unsubscribeAppointments();

    unsubscribeQueue();

  };

}, []);
  
  return (
    <AdminLayout>
      {/* DASHBOARD CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

      {/* APPOINTMENTS */}
      <AppointmentList />
      <QueueManagement />
      <MedicalRecords />
      <PrescriptionGenerator />
      <AppointmentCalendar />
      <PatientSearch />
      <FollowUpManagement />
      <NotificationsPanel />
      <div className="bg-white mt-8 p-6 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-gray-800">Recent Activity</h2>

        <p className="text-gray-500 mt-4">No activity yet.</p>
      </div>
    </AdminLayout>
  );
}

export default AdminDashboard;

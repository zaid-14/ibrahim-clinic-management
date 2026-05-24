import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AdminLayout from "./layouts/AdminLayout";

// ADMIN PAGES
import DashboardPage from "./pages/admin/DashboardPage";
import AppointmentsPage from "./pages/admin/AppointmentsPage";
import PatientsPage from "./pages/admin/PatientsPage";
import QueuePage from "./pages/admin/QueuePage";
import PrescriptionsPage from "./pages/admin/PrescriptionsPage";
import FollowUpsPage from "./pages/admin/FollowUpsPage";
import NotificationsPage from "./pages/admin/NotificationsPage";

// PATIENT
import PatientDashboard from "./pages/patient/PatientDashboard";

// DOCTOR
import DoctorLayout from "./layouts/DoctorLayout";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import DoctorAppointments from "./pages/doctor/DoctorAppointments";
import DoctorPrescriptions from "./pages/doctor/DoctorPrescriptions";

function App() {
  const { currentUser, userData } = useAuth();

  return (
    <Routes>
      {/* LOGIN */}
      <Route path="/login" element={<Login />} />

      {/* REGISTER */}
      <Route path="/register" element={<Register />} />

      {/* PATIENT */}
      <Route
        path="/patient"
        element={
          currentUser && userData?.role === "patient" ? (
            <PatientDashboard />
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      {/* ADMIN LAYOUT */}
      <Route
        path="/admin"
        element={
          currentUser && userData?.role === "admin" ? (
            <AdminLayout />
          ) : (
            <Navigate to="/login" />
          )
        }
      >
        <Route path="dashboard" element={<DashboardPage />} />

        <Route path="appointments" element={<AppointmentsPage />} />

        <Route path="patients" element={<PatientsPage />} />

        <Route path="queue" element={<QueuePage />} />

        <Route path="prescriptions" element={<PrescriptionsPage />} />

        <Route path="followups" element={<FollowUpsPage />} />

        <Route path="notifications" element={<NotificationsPage />} />
      </Route>

      {/* DOCTOR */}
      <Route
        path="/doctor"
        element={
          currentUser && userData?.role === "doctor" ? (
            <DoctorLayout />
          ) : (
            <Navigate to="/login" />
          )
        }
      >
        <Route path="dashboard" element={<DoctorDashboard />} />

        <Route path="appointments" element={<DoctorAppointments />} />

        <Route path="prescriptions" element={<DoctorPrescriptions />} />
      </Route>

      {/* DEFAULT */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;

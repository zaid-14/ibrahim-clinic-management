import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import PatientDashboard from "./pages/patient/PatientDashboard";

import AdminDashboard from "./pages/admin/AdminDashboard";

import DoctorDashboard from "./pages/doctor/DoctorDashboard";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {

  return (

    <Routes>

      <Route
        path="/"
        element={<Navigate to="/login" />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      {/* PATIENT */}
      <Route
        path="/patient"
        element={
          <ProtectedRoute allowedRole="patient">
            <PatientDashboard />
          </ProtectedRoute>
        }
      />

      {/* ADMIN */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* DOCTOR */}
      <Route
        path="/doctor"
        element={
          <ProtectedRoute allowedRole="doctor">
            <DoctorDashboard />
          </ProtectedRoute>
        }
      />

    </Routes>

  );

}

export default App;
import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function ProtectedRoute({
  children,
  allowedRole
}) {

  const {
    currentUser,
    userData
  } = useAuth();

  // Not Logged In
  if (!currentUser) {

    return <Navigate to="/login" />;

  }

  // Wrong Role
  if (allowedRole &&
      userData?.role !== allowedRole) {

    return <Navigate to="/login" />;

  }

  return children;

}

export default ProtectedRoute;
import { Navigate } from "react-router-dom";

export default function AdminProtectedRoute({
  children,
}) {
  const isAdmin =
    localStorage.getItem("adminAuth") === "true";

  return isAdmin ? children : (
    <Navigate to="/admin-login" />
  );
}
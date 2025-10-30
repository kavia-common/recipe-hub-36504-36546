import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

/**
 * PUBLIC_INTERFACE
 * ProtectedRoute redirects unauthenticated users to /login preserving 'from' location.
 */
export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="card">Loading...</div>;
  }
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
}

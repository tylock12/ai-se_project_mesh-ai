import {
  Navigate,
  Outlet,
  useLocation,
  useOutletContext,
} from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

type LocationState = { from?: { pathname: string } } | null;

export function ProtectedRoute() {
  const { isLoggedIn: isAuthenticated, isLoading } = useAuth();
  const context = useOutletContext();
  const location = useLocation();

  if (isLoading) return null;
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return <Outlet context={context} />;
}

export function PublicRoute() {
  const { isLoggedIn: isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return null;
  if (isAuthenticated) {
    const from = (location.state as LocationState)?.from?.pathname;
    return <Navigate to={from ?? "/knowledge"} replace />;
  }
  return <Outlet />;
}
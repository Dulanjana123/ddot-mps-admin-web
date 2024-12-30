import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@store/context/AuthContext";
import { hasRequiredRole } from "@core/utils/authUtils";
import { authDatService } from "@services/data/AuthDataService";

const ProtectedRoute = ({ auth = [], children }: any) => {
  const { userRole }: any = useAuth();

  const location = useLocation();
  const isIgnoreUrl =
    location.pathname.includes("/auth") ||
    location.pathname.includes("/register");

  if (
    !isIgnoreUrl &&
    (!hasRequiredRole(userRole, auth) || !authDatService.isValidToken())
  ) {
    return <Navigate to="/" />;
  }

  if (!hasRequiredRole(userRole, auth)) {
    return <Navigate to="/" />;
  }

  return children ?? <Outlet />;
};

export default ProtectedRoute;

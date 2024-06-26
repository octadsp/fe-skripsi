import { Navigate, Outlet } from "react-router-dom";

// Import context
import { useContext } from "react";

// Import UserContext
import { UserContext } from "../../context/userContext";

export function PrivateRouteUser() {
  const [state] = useContext(UserContext);

  if (state.user.roles === "Super Admin" || state.user.roles === "Admin") {
    return <Navigate to="/" />;
  }
  return <Outlet />;
}

export function PrivateRouteAdmin() {
  const [state] = useContext(UserContext);

  if (state.user.roles !== "Super Admin" || state.user.roles !== "Admin") {
    return <Navigate to="/" />;
  }
  return <Outlet />;
}

export function PrivateRouteVisible() {
  const [state] = useContext(UserContext);

  if (state.user.roles !== "Visible" || state.user.roles !== "Visible") {
    return <Navigate to="/" />;
  }
  return <Outlet />;
}

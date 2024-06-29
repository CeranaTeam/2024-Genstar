import { Navigate, Outlet } from "react-router-dom";
import { auth } from "@/firebase/firebase"

const ProtectedRoute = () => {
  const user = auth.currentUser;
  if (user) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;

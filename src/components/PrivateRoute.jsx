import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children, role }) {
  const { token, user } = useSelector((state) => state.auth);

  
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  
  if (!user) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" />
        <p className="mt-2">Loading account…</p>
      </div>
    );
  }

  
  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  
  return children;
}

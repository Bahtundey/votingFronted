import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import "../styles/navbar.css";

export default function Navbar() {
  const { token, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = !!token;
  const role = user?.role;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg votex-navbar">
      <div className="container">
       

        <Link className="navbar-brand fw-bold votex-logo" to="/">
          VoteX
        </Link>

       
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#votexNavbar"
          aria-controls="votexNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

       
        <div className="collapse navbar-collapse" id="votexNavbar">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
            {!isAuthenticated && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/about">About</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-primary ms-lg-2" to="/signup">
                    Sign Up
                  </Link>
                </li>
              </>
            )}

            {isAuthenticated && role === "user" && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/user">Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/my-votes">My Votes</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/settings">Settings</Link>
                </li>
              </>
            )}

            {isAuthenticated && role === "admin" && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin">Admin Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/manage">Manage Polls</Link>
                </li>
              </>
            )}

            {isAuthenticated && (
              <li className="nav-item">
                <button
                  onClick={handleLogout}
                  className="btn btn-outline-danger ms-lg-2"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

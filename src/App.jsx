import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import API from "./services/api";
import { setUser, logout } from "./store/authSlice";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";


import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Contact from "./pages/Contact";


import UserDashboard from "./pages/UserDashboard";
import Profile from "./pages/Profile";
import MyVotes from "./pages/MyVotes";
import UserSettings from "./pages/UserSettings";
import VoteHistory from "./pages/VoteHistory";
import PollAnalytics from "./pages/PollAnalytics";


import AdminDashboard from "./pages/AdminDashboard";
import AdminPollManagement from "./pages/AdminPollManagement";
import AdminAnalytics from "./pages/AdminAnalytics";
import AdminPollEdit from "./pages/AdminPollEdit";

export default function App() {
  const dispatch = useDispatch();
  const token = useSelector((s) => s.auth.token);
  const [authLoading, setAuthLoading] = useState(true);

  /**
   * 🔐 AUTH BOOTSTRAP
   * - Runs on refresh
   * - Fetches user/admin from backend
   * - Logs out if token is invalid
   */
  useEffect(() => {
    let isMounted = true;

    async function loadUser() {
      try {
        if (!token) {
          setAuthLoading(false);
          return;
        }

        const res = await API.get("/auth/me");

        if (isMounted) {
          dispatch(setUser(res.data.user));
        }
      } catch (err) {
        console.warn("Auth bootstrap failed — logging out");
        dispatch(logout());
      } finally {
        if (isMounted) {
          setAuthLoading(false);
        }
      }
    }

    loadUser();

    return () => {
      isMounted = false;
    };
  }, [token, dispatch]);

 
  if (authLoading) {
    return (
      <>
        <Navbar />
        <div className="container py-5 text-center">
          <div className="spinner-border text-primary" />
          <p className="mt-3">Loading session...</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <Routes>
        
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacy" element={<Privacy />} />

       
        <Route
          path="/user"
          element={
            <PrivateRoute role="user">
              <UserDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <PrivateRoute role="user">
              <Profile />
            </PrivateRoute>
          }
        />

        <Route
          path="/my-votes"
          element={
            <PrivateRoute role="user">
              <MyVotes />
            </PrivateRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <PrivateRoute role="user">
              <UserSettings />
            </PrivateRoute>
          }
        />

        <Route
          path="/history"
          element={
            <PrivateRoute role="user">
              <VoteHistory />
            </PrivateRoute>
          }
        />

        <Route
          path="/polls/:id/analytics"
          element={
            <PrivateRoute role="user">
              <PollAnalytics />
            </PrivateRoute>
          }
        />

       
        <Route
          path="/admin"
          element={
            <PrivateRoute role="admin">
              <AdminDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/manage"
          element={
            <PrivateRoute role="admin">
              <AdminPollManagement />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/analytics/:id"
          element={
            <PrivateRoute role="admin">
              <AdminAnalytics />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/polls/:id/edit"
          element={
            <PrivateRoute role="admin">
              <AdminPollEdit />
            </PrivateRoute>
          }
        />

       
        <Route
          path="*"
          element={
            <div className="container text-center py-5">
              <h2>404</h2>
              <p>Page not found</p>
            </div>
          }
        />
      </Routes>

      <Footer />
    </>
  );
}

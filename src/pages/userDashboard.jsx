import React, { useEffect, useState } from "react";
import API from "../services/api";
import PollCard from "../components/PollCard";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import socket from "../services/socket";
import  "../styles/dashboard.css";


export default function UserDashboard() {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
 const user = useSelector((s) => s.auth.user);

  async function loadPolls() {
    try {
      const { data } = await API.get("/polls/active");
  
      setPolls(data.polls || []);
    } catch (err) {
      console.error(" Failed loading polls:", err);
    }
    setLoading(false);
  }
  

  useEffect(() => {
    loadPolls();

    socket.on("voteUpdate", (update) => {
      setPolls((prev) =>
        prev.map((p) =>
          p._id === update.pollId
            ? { ...p, liveVotes: update.results }
            : p
        )
      );
    });

    socket.on("pollClosed", ({ pollId }) => {
      setPolls((prev) =>
        prev.map((p) =>
          p._id === pollId ? { ...p, isClosed: true } : p
        )
      );
    });

    return () => {
      socket.off("voteUpdate");
      socket.off("pollClosed");
    };
  }, []);

  return (
    <div className="dashboard-bg">
    <div className="container">
      <h2 className="text-white fw-bold mb-4">
        Welcome, {user?.name}
      </h2>
  
      <div className="dashboard-grid">
        {polls.map((poll) => (
          <div key={poll._id} className="dashboard-card">
            <PollCard poll={poll} onVoted={loadPolls} />
          </div>
        ))}
      </div>
    </div>
  </div>
  
  );
}

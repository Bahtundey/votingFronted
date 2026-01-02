import React, { useEffect, useState } from "react";
import API from "../services/api";
import  "../styles/dashboard.css";

export default function VoteHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadHistory() {
    try {
      const { data } = await API.get("/user/history");
      setHistory(data.history);
    } catch (err) {
      console.error("Failed to load history:", err);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadHistory();
  }, []);

  return (
    <div className="container mt-4">
      <h2 >My Vote History</h2>

      {loading && <p>Loading...</p>}

      {!loading && history.length === 0 && (
        <div className="alert alert-info">You haven’t voted on any polls yet.</div>
      )}

      {history.map((h) => (
        <div key={h.pollId} className="dashboard-card p-3 mb-3 shadow-sm">
          <h4>{h.title}</h4>
          <p>{h.description}</p>
          <p>
            <strong>Your Vote:</strong> {h.choice}
          </p>
          <p>
            <strong>Date:</strong>{" "}
            {new Date(h.votedAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}

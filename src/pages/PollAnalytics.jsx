import React, { useEffect, useState } from "react";
import API from "../services/api";

export default function MyVotes() {
  const [votes, setVotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVotes();
  }, []);

  async function fetchVotes() {
    try {
      const { data } = await API.get("/user/history");
      setVotes(data.history || []);
    } catch (e) {
      console.error("Failed to load votes:", e);
    }
    setLoading(false);
  }

  return (
    <div className="container py-5" style={{ maxWidth: 700 }}>
      <h2 className="mb-4">My Voting History</h2>

      {loading && <p>Loading your voting history...</p>}

      {!loading && votes.length === 0 && (
        <div className="alert alert-info">
          You haven't voted in any polls yet.
        </div>
      )}

      {!loading && votes.length > 0 && (
        <ul className="list-group">
          {votes.map((v) => (
            <li className="list-group-item" key={v.pollId}>
              <strong>{v.title}</strong>
              <span className="d-block text-muted">
                Your choice: <strong>{v.choice}</strong>
              </span>
              <span className="d-block small">
                Voted on: {new Date(v.votedAt).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

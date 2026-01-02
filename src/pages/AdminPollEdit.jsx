import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

export default function AdminPollEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [poll, setPoll] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loadPoll() {
    try {
      const { data } = await API.get(`/polls/${id}`);
      setPoll(data);
    } catch (err) {
      console.error("EDIT LOAD ERROR:", err);
    }
    setLoading(false);
  }

  async function saveChanges() {
    try {
      await API.put(`/polls/${id}`, poll);
      alert("Poll updated!");
      navigate("/admin");
    } catch (err) {
      console.error("SAVE ERROR:", err);
      alert("Failed to update poll.");
    }
  }

  useEffect(() => {
    loadPoll();
  }, [id]);

  if (loading) return <p>Loading poll...</p>;
  if (!poll) return <p>Poll not found.</p>;

  return (
    <div className="container mt-4">
      <h2>Edit Poll</h2>

      <label className="mt-3">Title</label>
      <input
        type="text"
        className="form-control"
        value={poll.title}
        onChange={(e) => setPoll({ ...poll, title: e.target.value })}
      />

      <label className="mt-3">Description</label>
      <textarea
        className="form-control"
        rows={3}
        value={poll.description}
        onChange={(e) => setPoll({ ...poll, description: e.target.value })}
      />

      <button className="btn btn-primary mt-4" onClick={saveChanges}>
        Save Changes
      </button>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import API from "../services/api";
import CreatePoll from "./CreatePoll";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import socket from "../services/socket";
import  "../styles/dashboard.css";



export default function AdminDashboard() {
  const navigate = useNavigate();
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);

  
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  async function loadPolls(p = page, q = search) {
    try {
      const { data } = await API.get(
        `/polls?page=${p}&search=${encodeURIComponent(q)}`
      );

      setPolls(data.polls || []);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error(" Failed to load polls:", err);
    }
    setLoading(false);
  }

  
  async function deletePoll(id) {
    if (!window.confirm("Are you sure you want to delete this poll?")) return;

    try {
      await API.delete(`/polls/${id}`);
      loadPolls();
      alert("Poll deleted!");
    } catch (err) {
      console.error("DELETE ERROR:", err);
      alert("Failed to delete poll");
    }
  }

  
  useEffect(() => {
    loadPolls();

    
    socket.on("voteUpdate", (update) => {
      setPolls((prev) =>
        prev.map((p) =>
          p._id === update.pollId ? { ...p, liveVotes: update.results } : p
        )
      );
    });

    socket.on("pollClosed", ({ pollId }) => {
      setPolls((prev) =>
        prev.map((p) => (p._id === pollId ? { ...p, isClosed: true } : p))
      );
    });

    return () => {
      socket.off("voteUpdate");
      socket.off("pollClosed");
    };
  }, []);

  
  useEffect(() => {
    loadPolls();
  }, [page, search]);

  return (
    <div className="dashboard-bg">
    <div className="container">

      <h2 className="text-white">Admin Dashboard</h2>

     
      <div className="dashboard-card mb-4">
      <CreatePoll onCreated={loadPolls} />
      </div>


      
      <input
        type="text"
        className="form-control mt-4"
        placeholder="Search polls..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />

      <h3 className="mt-4 text-white">All Polls</h3>

      {loading && <p>Loading polls...</p>}

      {!loading && polls.length === 0 && (
        <div className="alert alert-info">No polls created yet.</div>
      )}

      
    <div className="dashboard-grid">
    {polls.map((poll) => (
    <div key={poll._id} className="dashboard-card">

        
          <h4>{poll.title}</h4>
          <p>{poll.description}</p>

          <p>
            <strong>Ends:</strong>{" "}
            {new Date(poll.endsAt).toLocaleString()}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            {poll.isClosed ? (
              <span className="text-danger fw-bold">Closed</span>
            ) : (
              <span className="text-success fw-bold">Active</span>
            )}
          </p>

          
          {poll.liveVotes && (
            <div className="mt-2">
              <strong>Live Votes:</strong>
              <ul>
                {poll.liveVotes.map((c, i) => (
                  <li key={i}>
                    {poll.choices[i]?.text}: {c}
                  </li>
                ))}
              </ul>
            </div>
          )}

          
          <div className="dashboard-actions">

          <button
    className="btn btn-primary btn-sm"
    onClick={() => navigate(`/admin/polls/${poll._id}/edit`)}
  >
    Edit
  </button>

  
  <button
    className="btn btn-danger btn-sm"
    onClick={() => deletePoll(poll._id)}
  >
    Delete
  </button>

  
  <button
    className="btn btn-outline-primary btn-sm"
    onClick={() => exportCSV(poll._id)}
  >
    Export CSV
  </button>

  
  <button
    className="btn btn-outline-danger btn-sm"
    onClick={() => exportPDF(poll._id)}
  >
    Export PDF
  </button>

  
  <button
    className="btn btn-warning btn-sm"
    onClick={() => navigate(`/admin/analytics/${poll._id}`)}
  >
    View Analytics
  </button>
          </div>
        </div>
      ))}
      </div>

      
      <div className="d-flex justify-content-center gap-2 mt-4">
        <button
          className="btn btn-secondary"
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        <span className="mt-1">Page {page} of {totalPages}</span>

        <button
          className="btn btn-secondary"
          disabled={page >= totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
    </div>
  );
}



async function exportCSV(pollId) {
  try {
    const res = await API.get(`/export/${pollId}/csv`, {
      responseType: "blob",
    });

    const url = window.URL.createObjectURL(new Blob([res.data]));
    const a = document.createElement("a");
    a.href = url;
    a.download = `poll-${pollId}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("CSV Export Failed:", error);
    alert("CSV export failed.");
  }
}

async function exportPDF(pollId) {
  try {
    const res = await API.get(`/export/${pollId}/pdf`, {
      responseType: "blob",
    });

    const url = window.URL.createObjectURL(new Blob([res.data], { type: "application/pdf" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `poll-${pollId}.pdf`;
    a.click();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("PDF Export Failed:", error);
    alert("PDF export failed.");
  }
}


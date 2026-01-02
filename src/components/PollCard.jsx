import React, { useState } from "react";
import API from "../services/api";
import { useSelector } from "react-redux";

export default function PollCard({ poll, onVoted }) {
  const { token, user } = useSelector((s) => s.auth);
  const [loading, setLoading] = useState(false);

  const isExpired = poll.endsAt && new Date(poll.endsAt) < new Date();
  const isClosed = poll.isClosed || isExpired;

  const hasVoted = poll.votes?.some(
    (v) => v.user === user?.id || v.user?._id === user?.id
  );

  async function handleVote(choiceIndex) {
    if (!token) {
      alert("Please log in first");
      return;
    }

    if (isClosed) {
      alert("This poll is closed");
      return;
    }

    if (hasVoted) {
      alert("You have already voted on this poll");
      return;
    }

    if (choiceIndex === undefined || choiceIndex === null) {
      alert("Invalid choice");
      return;
    }

    try {
      setLoading(true);

      await API.post(`/polls/${poll._id}/vote`, {
        choiceIndex,
      });

      alert("Vote submitted!");
      onVoted(); 

    } catch (err) {
      console.error("VOTE ERROR:", err);
      alert(err.response?.data?.error || "Failed to submit vote");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card shadow-sm p-3 mb-3">
     
      <h4 className="mb-1">{poll.title}</h4>

     
      <p className="text-muted">{poll.description}</p>

      
      {isClosed ? (
        <div className="alert alert-warning p-2">This poll is closed.</div>
      ) : (
        <div className="alert alert-info p-2">
          Ends: {new Date(poll.endsAt).toLocaleString()}
        </div>
      )}

      
      {poll.choices.map((choice, index) => {
        const voteCount =
          poll.votes?.filter((v) => v.choiceIndex === index).length || 0;

        return (
          <div
            key={index}
            className="d-flex justify-content-between align-items-center border rounded p-2 mb-2"
          >
            <span>{choice.text}</span>

            <button
              className="btn btn-primary btn-sm"
              disabled={loading || isClosed || hasVoted}
              onClick={() => handleVote(index)}
            >
              {hasVoted ? "Voted" : "Vote"}
            </button>

            <span className="badge bg-secondary">{voteCount} votes</span>
          </div>
        );
      })}
    </div>
  );
}

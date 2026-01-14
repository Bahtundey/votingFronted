import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import { io } from "socket.io-client";
import socket from "../services/socket";



export default function PollDetails() {
  const { id } = useParams();
  const [poll, setPoll] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loadPoll() {
    try {
      const { data } = await API.get(`/polls/${id}`);
      setPoll(data.poll);
    } catch (err) {
      console.error("Failed to load poll:", err);
    }
    setLoading(false);
  }

  async function vote(choiceIndex) {
    try {
      await API.post(`/polls/${id}/vote`, { choiceIndex });
      alert("Vote submitted!");
    } catch (err) {
      console.error("VOTE ERROR:", err);
      alert("Failed to vote");
    }
  }

  useEffect(() => {
    loadPoll();

    
    if (id) {
      socket.emit("joinPoll", { pollId: id });
    } else {
      console.warn(" Missing pollId during joinPoll");
    }

    
    socket.on("voteUpdate", (update) => {
      if (update?.pollId === id) {
        setPoll((prev) => ({
          ...prev,
          liveVotes: update.results,
        }));
      }
    });

    socket.on("pollClosed", ({ pollId }) => {
      if (pollId === id) {
        setPoll((prev) => ({
          ...prev,
          isClosed: true,
        }));
      }
    });

    return () => {
      socket.off("voteUpdate");
      socket.off("pollClosed");
    };
  }, [id]);

  if (loading) return <p>Loading poll...</p>;
  if (!poll) return <p>Poll not found</p>;

  return (
    <div className="container mt-4">
      <h2>{poll.title}</h2>
      <p>{poll.description}</p>

      <p>
        <strong>Status:</strong>{" "}
        {poll.isClosed ? (
          <span className="text-danger fw-bold">Closed</span>
        ) : (
          <span className="text-success fw-bold">Active</span>
        )}
      </p>

      <h4>Choices</h4>
      {poll.choices.map((c, i) => (
        <button
          key={i}
          className="btn btn-outline-primary d-block my-2"
          disabled={poll.isClosed}
          onClick={() => vote(i)}
        >
          {c.text} {poll.liveVotes ? `(${poll.liveVotes[i]})` : ""}
        </button>
      ))}
    </div>
  );
}

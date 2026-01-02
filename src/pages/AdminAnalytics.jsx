import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";





import {
  Chart as ChartJS,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Doughnut } from "react-chartjs-2";






ChartJS.register(
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const socket = io(import.meta.env.VITE_API_URL.replace("/api", ""), {
  transports: ["websocket"],
});

export default function AdminAnalytics() {
  const { id } = useParams();
  const [poll, setPoll] = useState(null);
  const [loading, setLoading] = useState(true);

  const barChartRef = useRef(null);
  const doughnutChartRef = useRef(null);
  const chartsWrapperRef = useRef(null);


  async function loadAnalytics() {
    try {
      const { data } = await API.get(`/analytics/${id}`);
      setPoll(data.poll);
    } catch (err) {
      console.error("Analytics load error:", err);
    }
    setLoading(false);
  }

  useEffect(() => {
    if (!id) return;

    loadAnalytics();

    socket.emit("joinPoll", { pollId: id });

    socket.on("voteUpdate", (update) => {
      if (update.pollId === id) {
        setPoll((prev) =>
          prev
            ? {
                ...prev,
                results: update.results,
                percentages: update.percentages,
              }
            : prev
        );
      }
    });

    return () => {
      socket.emit("leavePoll", { pollId: id });
      socket.off("voteUpdate");
    };
  }, [id]);

  if (loading) return <p className="text-center mt-5">Loading analytics...</p>;
  if (!poll) return <p className="text-danger mt-5">Poll not found.</p>;

  

  const labels = poll.choices.map((c) => c.text);
const votes = poll.results || [];
const percentages = poll.percentages || [];


const maxVotes = Math.max(...votes);
const winningIndex = votes.findIndex((v) => v === maxVotes);


const barData = {
  labels,
  datasets: [
    {
      label: "Votes",
      data: votes,
      backgroundColor: votes.map((_, i) =>
        i === winningIndex ? "#198754" : "#0d6efd"
      ),
    },
  ],
};

const doughnutData = {
  labels,
  datasets: [
    {
      data: votes,
      backgroundColor: votes.map((_, i) =>
        i === winningIndex ? "#198754" : "#adb5bd"
      ),
    },
  ],
};



    function exportChartPNG(type = "bar") {
      const chart =
        type === "bar"
          ? barChartRef.current
          : doughnutChartRef.current;
  
      if (!chart) {
        alert("Chart not ready yet");
        return;
      }
  
     
      const url = chart.toBase64Image();
      const a = document.createElement("a");
  
      a.href = url;
      a.download = `${poll.title}-${type}-chart.png`;
      a.click();
    }
  
    function exportChartCSV() {
      if (!poll) return;
    
      let csv = "Choice,Votes,Percentage\n";
    
      poll.choices.forEach((choice, i) => {
        csv += `"${choice.text}",${votes[i] || 0},${percentages[i] || 0}%\n`;
      });
    
      const blob = new Blob([csv], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
    
      const a = document.createElement("a");
      a.href = url;
      a.download = `${poll.title}-analytics.csv`;
      a.click();
    
      window.URL.revokeObjectURL(url);
    }

    async function exportChartsPDF() {
      if (!chartsWrapperRef.current) {
        alert("Charts not ready");
        return;
      }
    
      const canvas = await html2canvas(chartsWrapperRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
      });
    
      const imgData = canvas.toDataURL("image/png");
    
      const pdf = new jsPDF("landscape", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
    
      pdf.addImage(
        imgData,
        "PNG",
        10,
        10,
        pageWidth - 20,
        pageHeight - 20
      );
    
      pdf.save(`${poll.title}-analytics.pdf`);
    }
    
    

  return (
    <div className="container mt-4">
      <h2 className="text-white ">Poll Analytics</h2>
      <h4 className="mt-2 text-light">{poll.title}</h4>

     
<div ref={chartsWrapperRef}>
  <div className="row mt-4">
    <div className="col-md-6">
      <div className="card p-3 shadow-sm">
        <h5 className="mb-3">Live Vote Count</h5>
        <Bar ref={barChartRef} data={barData} />
      </div>
    </div>

    <div className="col-md-6">
      <div className="card p-3 shadow-sm">
        <h5 className="mb-3">Vote Distribution</h5>
        <Doughnut ref={doughnutChartRef} data={doughnutData} />
      </div>
    </div>
  </div>
</div>


      
<div className="d-flex gap-2 mt-4 justify-content-center">
  <button
    className="btn btn-outline-primary"
    onClick={() => exportChartPNG("bar")}
  >
    Export Bar Chart (PNG)
  </button>

  <button
    className="btn btn-outline-success"
    onClick={() => exportChartPNG("doughnut")}
  >
    Export Doughnut Chart (PNG)
  </button>

  <button
    className="btn btn-outline-secondary"
    onClick={exportChartCSV}
  >
    Export Chart Data (CSV)
  </button>

  <button
  className="btn btn-outline-danger"
  onClick={exportChartsPDF}
>
  Export Charts (PDF)
</button>

</div>


      
      <div className="dashboard-card mb-4 mt-4">
        <h5>Choices & Results</h5>
        <ul className="list-group">
          {poll.choices.map((choice, i) => (
            <li
            key={i}
            className={`list-group-item d-flex justify-content-between ${
              i === winningIndex ? "bg-success text-white fw-bold" : ""
            }`}
          >
            <span>
              {choice.text}
              {i === winningIndex && (
                <span className="badge bg-light text-success ms-2">
                  Winner 
                </span>
              )}
            </span>
          
            <span>
              {votes[i] ?? 0} votes — {percentages[i] ?? 0}%
            </span>
          </li>
          
          ))}
        </ul>
      </div>

      
      <div className="dashboard-card mb-4 mt-4">
        <h5>Voter Details</h5>

        {!poll.votes?.length ? (
          <p>No votes have been cast yet.</p>
        ) : (
          <ul>
            {poll.votes.map((v, index) => (
              <li key={index}>
                {v.user?.name || "Unknown user"} →{" "}
                {poll.choices[v.choiceIndex]?.text || "N/A"}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

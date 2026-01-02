import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/about.css";
import pre2 from "../assets/pre2.webp";
import pre3 from "../assets/pre3.jpg";
import pre5 from "../assets/pre5.jpeg";


export default function About() {
  return (
    <div className="about-page">
  <div className="container py-5">

      
      <div className="text-center mb-5">
        <h2 className="fw-bold">About VoteX</h2>
        <p className="text-muted mt-2">
          Secure • Real-Time • Scalable Digital Voting Platform
        </p>
      </div>

      {/* ================= INTRO ================= */}
      <div className="row justify-content-center mb-5">
        <div className="col-md-10 text-center">
          <p className="lead">
            <strong>VoteX</strong> is a modern full-stack voting and polling
            platform designed for transparent, secure, and real-time decision
            making. Built for organizations, schools, and communities.
          </p>
        </div>
      </div>

      
      <div className="row mb-5">
        <div className="col text-center">
          <h3 className="fw-bold mb-3">Why VoteX?</h3>
          <p className="text-muted">
            VoteX solves the common problems of traditional and online voting
            systems.
          </p>
        </div>
      </div>

      <div className="row g-4 mb-5">
        <div className="col-md-4">
          <div className="card feature-card h-100">
            <div className="card-body text-center">
              <i className="bi bi-shield-lock-fill feature-icon"></i>
              <h5 className="fw-bold mt-3">Security First</h5>
              <p className="text-muted">
                JWT authentication, role-based access control, and backend
                validation ensure vote integrity.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card feature-card h-100">
            <div className="card-body text-center">
              <i className="bi bi-lightning-charge-fill feature-icon"></i>
              <h5 className="fw-bold mt-3">Live Updates</h5>
              <p className="text-muted">
                Real-time vote updates using Socket.IO without page refresh.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card feature-card h-100">
            <div className="card-body text-center">
              <i className="bi bi-graph-up-arrow feature-icon"></i>
              <h5 className="fw-bold mt-3">Actionable Insights</h5>
              <p className="text-muted">
                Visual analytics, charts, and exports (CSV / PNG / PDF).
              </p>
            </div>
          </div>
        </div>
      </div>

      
      <div className="row g-4 mb-5">
        {[
          {
            icon: "bi-people-fill",
            title: "User & Admin Roles",
            text: "Separate dashboards and permissions for users and admins.",
          },
          {
            icon: "bi-envelope-paper-fill",
            title: "Email Notifications",
            text: "Users receive notifications for new polls, votes, and results.",
          },
          {
            icon: "bi-bar-chart-fill",
            title: "Advanced Analytics",
            text: "Live charts, winning vote highlights, and turnout stats.",
          },
          {
            icon: "bi-cloud-check-fill",
            title: "Scalable Architecture",
            text: "Built with modern technologies for production readiness.",
          },
          {
            icon: "bi-phone-fill",
            title: "Mobile Friendly",
            text: "Fully responsive UI optimized for all devices.",
          },
          {
            icon: "bi-code-slash",
            title: "Modern Stack",
            text: "React, Redux Toolkit, Node.js, MongoDB, Socket.IO.",
          },
        ].map((f, i) => (
          <div className="col-md-4" key={i}>
            <div className="card feature-card h-100">
              <div className="card-body">
                <i className={`bi ${f.icon} feature-icon-sm`}></i>
                <h6 className="fw-bold mt-2">{f.title}</h6>
                <p className="text-muted small">{f.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

     
      <div className="row mb-5">
        <div className="col text-center">
          <h3 className="fw-bold mb-4">Platform Preview</h3>
        </div>
      </div>

      <div
        id="voteXCarousel"
        className="carousel slide shadow rounded"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner rounded">
          {[
            "../assets/votes.avif",
            "/screenshots/admin.png",
            "/screenshots/analytics.png",
          ].map((img, i) => (
            <div
              className={`carousel-item ${i === 0 ? "active" : ""}`}
              key={i}
            >
              
               <img
                src={pre2}
                className="d-block w-100"
                alt="VoteX screenshot"
              />
            </div>
          ))}
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#voteXCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon"></span>
        </button>

        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#voteXCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>

      <div className="text-center mt-5">
        <p className="text-muted small">
          VoteX is built as a real-world voting solution and a demonstration of
          modern full-stack engineering best practices.
        </p>
      </div>
    </div>
    </div>
  );
}

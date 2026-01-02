import React from "react";
import "../styles/privacy.css";

export default function Privacy() {
  return (
    <div className="privacy-page">
      <div className="container py-5" style={{ maxWidth: "900px" }}>

        
        <div className="text-center mb-5">
          <h1 className="fw-bold text-white">Privacy Policy</h1>
          <p className="text-white-50 mt-2" style={{ fontSize: "1.1rem" }}>
            Your trust matters — here’s how VoteX protects your information.
          </p>
        </div>

        
        <div className="privacy-card p-4 p-md-5 shadow-lg">

          <section className="mb-4">
            <h4>🔒 Your Privacy, Our Priority</h4>
            <p>
              At VoteX, we are committed to safeguarding your personal data.
              Every vote you cast remains <strong>anonymous</strong>, encrypted,
              and protected with industry-standard security practices.
            </p>
          </section>

          <section className="mb-4">
            <h4>🛡️ Secure & Encrypted Data</h4>
            <p>
              All authentication data, user accounts, and poll interactions are
              encrypted using modern security standards to prevent unauthorized access.
            </p>
          </section>

          <section className="mb-4">
            <h4>🚫 No Selling or Sharing of Data</h4>
            <p>
              We will <strong>never</strong> sell, rent, or distribute your personal
              information to third parties.
            </p>
          </section>

          <section className="mb-4">
            <h4>📊 Transparent Data Usage</h4>
            <p>
              Collected data is used strictly to provide a secure, reliable, and
              real-time voting experience.
            </p>
          </section>

          <section className="mb-4">
            <h4>📦 What We Collect</h4>
            <ul>
              <li>Basic account details (name, email)</li>
              <li>Poll interactions (votes, polls created)</li>
              <li>Session and security metadata</li>
            </ul>
          </section>

          <section>
            <h4>📬 Contact Us</h4>
            <p>
              For privacy concerns or data requests, reach us at:
              <br />
              <strong>support@votex.app</strong>
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}

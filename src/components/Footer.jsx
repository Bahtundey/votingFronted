import React from "react";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/footer.css";

export default function Footer() {
  return (
    <footer className="votex-footer mt-5">
      <div className="container py-5">
        <div className="row gy-4">


          <div className="col-md-4">
            <h4 className="fw-bold votex-footer-logo">VoteX</h4>
            <p className="small text-light opacity-75">
              A secure, real-time digital voting platform built for transparency,
              scalability, and modern decision-making.
            </p>
          </div>

          
          <div className="col-6 col-md-2">
            <h6 className="fw-bold">Platform</h6>
            <ul className="list-unstyled">
              <li><Link to="/about">About</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Sign Up</Link></li>
            </ul>
          </div>

         
          <div className="col-6 col-md-3">
            <h6 className="fw-bold">Resources</h6>
            <ul className="list-unstyled">
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li>Contact</li>
              <li><span className="text-muted small">API & Docs (Coming Soon)</span></li>
            </ul>
          </div>


          <div className="col-md-3">
            <h6 className="fw-bold">Connect</h6>
            <div className="d-flex gap-3 mt-2">
              <a href="#" aria-label="Twitter">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="#" aria-label="GitHub">
                <i className="bi bi-github"></i>
              </a>
              <a href="#" aria-label="LinkedIn">
                <i className="bi bi-linkedin"></i>
              </a>
            </div>
          </div>

        </div>


        <hr className="footer-divider my-4" />

        <div className="text-center small opacity-75">
          © {new Date().getFullYear()} VoteX. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AOS from "aos";
import "aos/dist/aos.css";
import votes from "../assets/votes.avif";
import realtime from "../assets/realtime.svg";
import creates from "../assets/creates.JPG";
import voting from "../assets/voting.jpg";
import "../styles/landing.css";

export default function Landing() {
  useEffect(() => {
    AOS.init({ duration: 900, once: true });
  }, []);

  return (
    <div className="bg-light" style={{ minHeight: "100vh" }}>
      
      
      <section className="py-5 text-center hero-gradient">
  <div className="container" data-aos="fade-up">
    <h1 className="display-4 fw-bold">
      Welcome to <span>VoteX</span>
    </h1>

    <p className="lead mt-3 mb-4">
      Modern. Secure. Real-Time.  
      A complete voting solution for communities, organizations, and leaders.
    </p>

    <div className="mt-4">
      <Link className="btn btn-warning btn-lg me-3" to="/login">
        Get Started
      </Link>
      <Link className="btn btn-outline-light btn-lg" to="/signup">
        Create Account
      </Link>
    </div>

    <img
      data-aos="zoom-in"
      src={voting}
      alt="Voting illustration"
      className="img-fluid mt-5 hero-image"
      style={{ maxWidth: "520px" }}
    />

    
<section className="py-5 bg-white shadow-sm">
  <div className="container">
    <div className="row align-items-center">

      
      <div className="col-md-6" data-aos="fade-right">
        <h1 className="display-4 fw-bold text-primary">
          Welcome to <span className="text-dark">VoteX</span>
        </h1>

        <p className="lead mt-3">
          Modern. Secure. Real-Time.
          <br />
          A complete voting solution for communities, organizations, and leaders.
        </p>

        <div className="d-flex gap-3 mt-4">
          <Link to="/login" className="btn btn-primary btn-lg">
            Get Started
          </Link>
          <Link to="/signup" className="btn btn-outline-secondary btn-lg">
            Create Account
          </Link>
        </div>
      </div>

      
      <div className="col-md-6 mt-4 mt-md-0" data-aos="fade-left">
        <div
          id="heroCarousel"
          className="carousel slide shadow rounded overflow-hidden"
          data-bs-ride="carousel"
        >

          
          <div className="carousel-indicators">
            <button data-bs-target="#heroCarousel" data-bs-slide-to="0" className="active" />
            <button data-bs-target="#heroCarousel" data-bs-slide-to="1" />
            <button data-bs-target="#heroCarousel" data-bs-slide-to="2" />
          </div>

          
          <div className="carousel-inner">

            <div className="carousel-item active">
              <img
                src={votes}
                className="d-block w-100"
                alt="Secure voting"
                style={{ height: "320px", objectFit: "cover" }}
              />
              <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-2">
                <h5>Secure Voting</h5>
                <p>Your votes are encrypted and protected.</p>
              </div>
            </div>

            <div className="carousel-item">
              <img
                src={realtime}
                className="d-block w-100"
                alt="Real-time results"
                style={{ height: "320px", objectFit: "cover" }}
              />
              <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-2">
                <h5>Real-Time Results</h5>
                <p>See votes update instantly as they happen.</p>
              </div>
            </div>

            <div className="carousel-item">
              <img
                src={creates}
                className="d-block w-100"
                alt="Create polls"
                style={{ height: "320px", objectFit: "cover" }}
              />
              <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-2">
                <h5>Create Polls Easily</h5>
                <p>Admins can create and manage polls in seconds.</p>
              </div>
            </div>

          </div>

          
          <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" />
          </button>

          <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon" />
          </button>

        </div>
      </div>

    </div>
  </div>
</section>

  </div>
</section>


      
      <section className="py-5 gg text-white">
        <div className="container text-center">
          <div className="row">

            <div className="col-md-4 stats-box" data-aos="fade-up">
              <h2 className="fw-bold">95+</h2>
              <p>Total Votes Cast</p>
            </div>

            <div className="col-md-4" data-aos="fade-up" data-aos-delay="100">
              <h2 className="fw-bold">150+</h2>
              <p>Registered Users</p>
            </div>

            <div className="col-md-4" data-aos="fade-up" data-aos-delay="200">
              <h2 className="fw-bold">10+</h2>
              <p>Polls Created</p>
            </div>

          </div>
        </div>
      </section>

     
      <section className="gg py-5 bg-light text-white">
        <div className="container text-center">
          <h2 className="fw-bold mb-4 " data-aos="fade-up">How VoteX Works</h2>

          <div className="row mt-4">

            <div className="col-md-4" data-aos="fade-up">
              <img
                src={creates}
                className="img-fluid mb-3"
                style={{ height: "180px" }}
                alt="Create poll"
              />
              <h5>Create Polls Instantly</h5>
              <p>Admins create polls in seconds—fast, simple, and powerful.</p>
            </div>

            <div className="col-md-4" data-aos="fade-up" data-aos-delay="100">
              <img
                src={votes}
                className="img-fluid mb-3"
                style={{ height: "180px" }}
                alt="Vote"
              />
              <h5>Vote Securely</h5>
              <p>Users participate with verified accounts to ensure trust.</p>
            </div>

            <div className="col-md-4" data-aos="fade-up" data-aos-delay="200">
              <img
                src={realtime}
                className="img-fluid mb-3"
                style={{ height: "180px" }}
                alt="Results"
              />
              <h5>Real-Time Results</h5>
              <p>Charts and analytics update instantly for everyone.</p>
            </div>

          </div>
        </div>
      </section>

      
      <section className="py-5 gg">
        <div className="container">
          <h2 className="fw-bold text-center mb-4 text-white" data-aos="fade-up">
            Frequently Asked Questions
          </h2>

          <div className="accordion" id="faqAccordion">

            <div className="accordion-item" data-aos="fade-up">
              <h2 className="accordion-header">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#q1">
                  Is VoteX secure?
                </button>
              </h2>
              <div id="q1" className="accordion-collapse collapse show">
                <div className="accordion-body">
                  Yes. Every vote is securely tied to verified users and protected with backend validation.
                </div>
              </div>
            </div>

            <div className="accordion-item" data-aos="fade-up" data-aos-delay="100">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#q2">
                  Can polls update in real-time?
                </button>
              </h2>
              <div id="q2" className="accordion-collapse collapse">
                <div className="accordion-body">
                  Absolutely! VoteX uses Socket.io to push updates instantly.
                </div>
              </div>
            </div>

            <div className="accordion-item" data-aos="fade-up" data-aos-delay="200">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#q3">
                  Can anyone create a poll?
                </button>
              </h2>
              <div id="q3" className="accordion-collapse collapse">
                <div className="accordion-body">
                  Only registered users can create polls, ensuring quality and accountability.
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      

    </div>
  );
}

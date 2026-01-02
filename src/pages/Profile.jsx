import React from "react";

export default function Profile() {
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");
  const avatar = localStorage.getItem("avatar"); 

  return (
    <div className="bg-light py-5">
      <div className="container" style={{ maxWidth: 650 }}>
        
        <h2 className="fw-bold text-center mb-4">My Profile</h2>

        <div className="card shadow border-0 p-4">
          <div className="text-center">

            
            <img
              src={
                avatar ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt="Avatar"
              className="rounded-circle mb-3"
              style={{
                width: 120,
                height: 120,
                objectFit: "cover",
                border: "3px solid #e9ecef",
              }}
            />

            
            <h3 className="fw-bold">{name || "Unknown User"}</h3>
            <p className="text-muted mb-3">{email || "Email not available"}</p>

            
            <span
              className={`badge ${
                role === "admin" ? "bg-danger" : "bg-primary"
              } px-3 py-2`}
              style={{ fontSize: "1rem" }}
            >
              {role?.toUpperCase()}
            </span>

            <hr className="my-4" />

          </div>

          
          <div className="mb-3">
            <h5 className="text-primary">👤 About You</h5>
            <p className="text-secondary">
              This is your profile information. You can update your details via
              the settings page anytime.
            </p>
          </div>

          <div className="mb-3">
            <h5 className="text-primary">📧 Contact Email</h5>
            <p className="text-secondary">{email}</p>
          </div>

          <div className="mb-3">
            <h5 className="text-primary">🛡️ Account Role</h5>
            <p className="text-secondary">You are logged in as a <strong>{role}</strong>.</p>
          </div>

          <div className="text-center mt-4">
            <a
              href="/settings"
              className="btn btn-outline-primary px-4"
            >
              Edit Profile
            </a>
          </div>

        </div>

        <div className="text-center text-muted mt-4">
          <small>© {new Date().getFullYear()} VoteX — Profile Center</small>
        </div>

      </div>
    </div>
  );
}

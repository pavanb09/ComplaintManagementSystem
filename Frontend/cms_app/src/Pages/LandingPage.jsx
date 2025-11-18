import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css"; // import CSS file

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">

      {/* NAVBAR */}
      <header className="navbar">
        <div className="nav-left">
          <div className="logo-box">CMS</div>
          <span className="logo-text">Complaint Management System</span>
        </div>

        <nav className="nav-right">
          <button onClick={() => navigate("/")}>Home</button>
          <a href="#features">Features</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <button  onClick={() => navigate("/login")}>
            Login
          </button>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-content">
          <span className="tagline">Trusted • Efficient • Secure</span>

          <h1 style={{color:"black"}}>
            Welcome to <span className="highlight">Complaint Management System</span>
          </h1>

          <p className="hero-text">
            A powerful platform to submit, track, and resolve complaints with transparency
            and efficiency.
          </p>

          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => navigate("/login")}>
              Login
            </button>

            <button className="btn-outline" onClick={() => navigate("/register/student")}>
              Student Register
            </button>

            <button className="btn-outline" onClick={() => navigate("/register/admin")}>
              Admin Register
            </button>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="features-section">
        <h2>Features</h2>

        <div className="features-grid">
          <div className="feature-card">
            <h3>Easy Submission</h3>
            <p>Simple and organized complaint submission process.</p>
          </div>

          <div className="feature-card">
            <h3>Transparent Tracking</h3>
            <p>Students can see real-time updates on every complaint.</p>
          </div>

          <div className="feature-card">
            <h3>Role-Based Access</h3>
            <p>Admins and students have separate dashboards.</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-grid">
          <div>
            <h4>About CMS</h4>
            <p>
              CMS helps institutions manage and resolve complaints quickly with a clean
              interface and robust workflow.
            </p>
          </div>

          <div>
            <h4>Contact</h4>
            <p>Email: support@cms.com</p>
            <p>Phone: +1 800 555 0199</p>
          </div>

          <div id="contact">
            <h4>Get Started</h4>
            <p>Sign up now and streamline your complaint handling process.</p>
            <button className="btn-primary small-btn " onClick={() => navigate("/register/student")}>
              Student Signup
            </button>
            <button className="btn-outline small-btn" onClick={() => navigate("/register/admin")}>
              Admin Signup
            </button>
          </div>
        </div>

        <p className="footer-bottom">
          © {new Date().getFullYear()} Complaint Management System. All rights reserved. | @Team FullStack Ninjas
        </p>
      </footer>
    </div>
  );
}

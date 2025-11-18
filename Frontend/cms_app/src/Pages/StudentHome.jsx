import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function StudentHome() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [recent, setRecent] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    resolved: 0,
    pending: 0,
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = () => {
    axios
      .get(`http://localhost:8080/api/complaints/user/${userId}`)
      .then((res) => {
        const all = res.data;
        setRecent(all.slice(0, 4));

        const total = all.length;
        const resolved = all.filter((c) => c.status === "CLOSED").length;
        const pending = all.filter((c) => c.status === "OPEN").length;

        setStats({ total, resolved, pending });
      })
      .catch((err) => console.log(err));
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  /* ------------------ STYLES ------------------ */

  const layout = {
    fontFamily: "Roboto, sans-serif",
    background: "#f0f6ff",
    minHeight: "100vh",
  };

  const navbar = {
    width: "100%",
    padding: "14px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "rgba(255,255,255,0.9)",
    backdropFilter: "blur(8px)",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    position: "sticky",
    top: 0,
    zIndex: 10,
    flexWrap: "wrap",
    gap: "10px",
  };

  const navLeft = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flexWrap: "wrap",
  };

  const logoBox = {
    background: "#0066ff",
    width: "40px",
    height: "40px",
    borderRadius: "6px",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "700",
    fontSize: "18px",
  };

  const navRight = {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    flexWrap: "wrap",
    justifyContent: "flex-end",
  };

  const navLink = {
    fontSize: "15px",
    color: "#003366",
    cursor: "pointer",
    fontWeight: "500",
    whiteSpace: "nowrap",
  };

  const profile = {
    fontWeight: "600",
    color: "#003366",
  };

  const logoutBtn = {
    padding: "6px 14px",
    background: "#e63946",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  };

  const content = {
    width: "95%",
    maxWidth: "1100px",
    margin: "30px auto",
    paddingBottom: "40px",
  };

  const welcomeBanner = {
    background: "linear-gradient(to right, #e8f1ff, #ffffff)",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 3px 10px rgba(0,0,0,0.07)",
    marginBottom: "28px",
  };

  const bannerTitle = {
    fontSize: "28px",
    fontWeight: "700",
    color: "#003366",
  };

  const sections = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "25px",
  };

  const card = {
    background: "#ffffff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
  };

  const cardTitle = {
    fontSize: "20px",
    fontWeight: "600",
    color: "#003366",
    marginBottom: "10px",
  };

  const quickBtn = {
    padding: "12px 20px",
    background: "#0066ff",
    color: "white",
    border: "none",
    borderRadius: "8px",
    width: "100%",
    cursor: "pointer",
    marginBottom: "12px",
    fontSize: "15px",
    fontWeight: "500",
  };

  return (
    <div style={layout}>
      {/* RESPONSIVE MEDIA QUERIES */}
      <style>
        {`
          @media (max-width: 768px) {
            .navbar {
              flex-direction: column;
              align-items: flex-start;
              gap: 10px;
            }

            .nav-right {
              width: 100%;
              justify-content: space-between;
            }

            .sections {
              grid-template-columns: 1fr;
            }

            .nav-link {
              font-size: 14px;
            }

            .bannerTitle {
              font-size: 22px;
            }
          }
        `}
      </style>

      {/* NAVBAR */}
      <div className="navbar" style={navbar}>
        <div style={navLeft}>
          <div style={logoBox}>CMS</div>
          <h3>Complaint Management System</h3>
        </div>

        <div className="nav-right" style={navRight}>
          <p className="nav-link" style={navLink} onClick={() => navigate("/student/complaint-form")}>
            Submit Complaint
          </p>
          <p className="nav-link" style={navLink} onClick={() => navigate("/student/my-complaints")}>
            My Complaints
          </p>
          <p style={profile}>Welcome, Student</p>
          <button style={logoutBtn} onClick={logout}>Logout</button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={content}>
        {/* BANNER */}
        <div style={welcomeBanner}>
          <h2 className="bannerTitle" style={bannerTitle}>Welcome Back 👨‍🎓</h2>
          <p style={{ fontSize: "16px", color: "#003366" }}>
            Manage your complaints quickly and easily.
          </p>
        </div>

        {/* SECTIONS */}
        <div className="sections" style={sections}>
          {/* QUICK ACTIONS */}
          <div style={card}>
            <h3 style={cardTitle}>Quick Actions</h3>

            <button style={quickBtn} onClick={() => navigate("/student/complaint-form")}>
              Submit New Complaint
            </button>

            <button style={quickBtn} onClick={() => navigate("/student/my-complaints")}>
              View My Complaints
            </button>
          </div>

          {/* SUMMARY */}
          <div style={card}>
            <h3 style={cardTitle}>Complaint Summary</h3>
            <p>Total Complaints: <b>{stats.total}</b></p>
            <p>Resolved: <b style={{ color: "green" }}>{stats.resolved}</b></p>
            <p>Pending: <b style={{ color: "red" }}>{stats.pending}</b></p>
          </div>
        </div>
      </div>
    </div>
  );
}

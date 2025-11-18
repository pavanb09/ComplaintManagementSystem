import { useEffect, useState } from "react";
import { api } from "../Services/api";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminDashboard() {

  const [complaints, setComplaints] = useState([]);
 const [open, setOpen] = useState([]);
const [closed, setClosed] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchAll();

    console.log(complaints);
  }, []);

  const fetchAll = () => {

  // ALL COMPLAINTS
  axios.get("http://localhost:8080/api/complaints")
    .then(res => setComplaints(res.data))
    .catch(err => console.log(err));

  // OPEN COMPLAINTS
  axios.get("http://localhost:8080/api/complaints/status/OPEN")
    .then(res => setOpen(res.data))
    .catch(err => console.log(err));

  // CLOSED COMPLAINTS
  axios.get("http://localhost:8080/api/complaints/status/CLOSED")
    .then(res => setClosed(res.data))
    .catch(err => console.log(err));
};


const updateStatus = (id) => {
  console.log("Triggered with id =", id);

  axios.patch(`http://localhost:8080/api/complaints/${id}/status`, {
    status: "CLOSED"
  })
  .then(() => {
    
    fetchAll();
  })
  .catch(err => console.log(err));
};






  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const setOpenData = ()=>{
    setComplaints(open);
    console.log(open)
  }

  const setCloseData = ()=>{
    setComplaints(closed);
  }
  /* =========== THEME STYLES =========== */

  const page = {
    maxWidth: "1050px",
    margin: "40px auto",
    padding: "20px",
    background: "#f5faff",
    borderRadius: "12px",
    boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
    fontFamily: "Roboto, sans-serif",
  };

  const title = {
    fontSize: "30px",
    fontWeight: "600",
    color: "#003366",
    marginBottom: "10px",
  };

  const btnRow = {
    display: "flex",
    gap: "15px",
    marginBottom: "25px",
    flexWrap: "wrap",
  };

  const btn = {
    padding: "10px 20px",
    border: "none",
    borderRadius: "6px",
    background: "#0066ff",
    color: "white",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  };

  const btnGray = {
    ...btn,
    background: "#5a6c7a",
  };

  const btnDanger = {
    ...btn,
    background: "#e63946",
  };

  const tableWrapper = {
    marginTop: "20px",
    overflowX: "auto",
    borderRadius: "10px",
    background: "white",
    padding: "10px",
    boxShadow: "0 3px 10px rgba(0,0,0,0.15)",
  };

  const table = {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "800px",
  };

  const th = {
    background: "#0066ff",
    color: "white",
    padding: "12px",
    fontSize: "15px",
    fontWeight: "500",
    textAlign: "left",
  };

  const td = {
    padding: "12px",
    borderBottom: "1px solid #d9e7ff",
    fontSize: "14px",
  };

  return (
    <div style={page}>
      <h2 style={title}>Admin Dashboard ⚙️</h2>

      {/* BUTTON ROW */}
      <div style={btnRow}>
        <button style={btn} onClick={fetchAll}>
          All Complaints
        </button>

        <button style={btnGray} onClick={setOpenData }>
          View Open Complaints
        </button>

        <button style={btnGray} onClick={setCloseData} >
          View Closed Complaints
        </button>

        <button style={btnDanger} onClick={logout}>
          Logout
        </button>
      </div>

      <h3 style={{ marginBottom: "10px", color: "#003366" }}>
        All Complaints
      </h3>

      {/* DATA TABLE */}
      <div style={tableWrapper}>
        <table style={table}>
          <thead>
            <tr>
              <th style={th}>ID</th>
              <th style={th}>Title</th>
              <th style={th}>Category</th>
              <th style={th}>Status</th>
              <th style={th}>Update</th>
            </tr>
          </thead>

          <tbody>
            {complaints.map((c) => (
              <tr key={c.id}>
                <td style={td}>{c.id}</td>
                <td style={td}>{c.title}</td>
                <td style={td}>{c.category}</td>

                <td
                  style={{
                    ...td,
                    color: c.status === "OPEN" ? "green" : "Red",
                    fontWeight: "600",
                  }}
                >
                  {c.status}
                </td>
                <td
                  style={{
                    ...td,
                    color: c.status === "open" ? "red" : "green",
                    fontWeight: "600",
                  }}
                >
                 <button style={btnGray} onClick={() => updateStatus(c.id)}>
  Update
</button>


                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

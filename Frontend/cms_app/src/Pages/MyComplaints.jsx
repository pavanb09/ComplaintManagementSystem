import { useEffect, useState } from "react";
import axios from "axios";

export default function MyComplaints() {

  const [complaints, setComplaints] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/complaints/user/${userId}`)
      .then((res) => setComplaints(res.data))
      .catch((err) => console.log(err));
  }, []);

  /* ------------------ THEME STYLES ------------------ */

  const container = {
    maxWidth: "1050px",
    margin: "40px auto",
    padding: "20px",
    background: "#f5faff",
    borderRadius: "12px",
    boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
    fontFamily: "Roboto, sans-serif",
  };

  const title = {
    fontSize: "28px",
    fontWeight: "600",
    color: "#003366",
    marginBottom: "20px",
    textAlign: "center",
  };

  const tableWrapper = {
    overflowX: "auto",
    borderRadius: "10px",
    background: "#ffffff",
    padding: "10px",
    boxShadow: "0 3px 10px rgba(0,0,0,0.12)",
  };

  const table = {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "850px",
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

  const emptyText = {
    textAlign: "center",
    padding: "20px",
    color: "#555",
    fontStyle: "italic",
  };

  return (
    <div style={container}>
      <h2 style={title}>My Complaints</h2>

      <div style={tableWrapper}>
        <table style={table}>
          <thead>
            <tr>
              <th style={th}>ID</th>
              <th style={th}>Title</th>
              <th style={th}>Category</th>
              <th style={th}>Status</th>
              <th style={th}>Created On</th>
            </tr>
          </thead>

          <tbody>
            {complaints.length === 0 ? (
              <tr>
                <td colSpan="5" style={emptyText}>No complaints found.</td>
              </tr>
            ) : (
              complaints.map((c) => (
                <tr key={c.id}>
                  <td style={td}>{c.id}</td>
                  <td style={td}>{c.title}</td>
                  <td style={td}>{c.category}</td>

                  <td
                    style={{
                      ...td,
                      color: c.status === "CLOSED" ? "red" : "green",
                      fontWeight: "600",
                    }}
                  >
                    {c.status.toUpperCase()}
                  </td>

                  <td style={td}>
                    {new Date(c.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

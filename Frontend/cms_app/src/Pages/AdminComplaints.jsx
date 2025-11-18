import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminComplaints() {

  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetchAll();
    console.log(complaints)
  }, []);

  const fetchAll = () => {
    axios
      .get("http://localhost:8080/api/complaints")
      .then((res) => setComplaints(res.data))
      .catch((err) => console.log(err));
  };

  const markClosed = (id) => {
    axios
      .put(`http://localhost:8080/api/complaints/${id}?status=closed`)
      .then(() => fetchAll())
      .catch((err) => console.log(err));
  };

  /* ------------------ STYLES ------------------ */
  const container = {
    maxWidth: "1050px",
    margin: "40px auto",
    padding: "20px",
    borderRadius: "12px",
    background: "#f5faff",
    boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
    fontFamily: "Roboto, sans-serif",
  };

  const title = {
    textAlign: "center",
    fontSize: "28px",
    color: "#003366",
    marginBottom: "20px",
    fontWeight: "600",
  };

  const tableWrapper = {
    overflowX: "auto",
    borderRadius: "12px",
    background: "#ffffff",
    padding: "10px",
    boxShadow: "0 3px 10px rgba(0, 0, 0, 0.1)",
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

  const btnClose = {
    padding: "6px 14px",
    background: "#0057e7",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "13px",
  };

  const closedBadge = {
    color: "green",
    fontWeight: "bold",
  };

  return (
    <div style={container}>
      <h2 style={title}>All Complaints (Admin)</h2>

      <div style={tableWrapper}>
        <table style={table}>
          <thead>
            <tr>
              <th style={th}>ID</th>
              <th style={th}>Title</th>
              <th style={th}>Category</th>
              <th style={th}>Description</th>
              <th style={th}>Status</th>
              <th style={th}>User</th>
              <th style={th}>Action</th>
            </tr>
          </thead>

          <tbody>
            {complaints.map((c) => (
              <tr key={c.id}>
                <td style={td}>{c.id}</td>
                <td style={td}>{c.title}</td>
                <td style={td}>{c.category}</td>
                <td style={td}>{c.description}</td>

                {/* Status */}
                <td
                  style={{
                    ...td,
                    color: c.status === "open" ? "red" : "green",
                    fontWeight: "600",
                  }}
                >
                  {c.status}
                </td>

                {/* User */}
                <td style={td}>{c.user?.name}</td>

                {/* Action Button */}
                <td style={td}>
                  {c.status === "open" ? (
                    <button style={btnClose} onClick={() => markClosed(c.id)}>
                      Mark Closed
                    </button>
                  ) : (
                    <span style={closedBadge}>Completed</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}

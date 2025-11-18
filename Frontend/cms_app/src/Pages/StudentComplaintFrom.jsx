import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function StudentComplaintForm() {

  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    userId: userId
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/api/complaints", form)
      .then(() => {
        setMessage("Complaint submitted successfully!");
        setTimeout(() => navigate("/student/my-complaints"), 1500);
      })
      .catch(() => setMessage("Failed to submit complaint"));
  };

  /* ------------------ THEME STYLES ------------------ */

  const container = {
    width: "480px",
    margin: "50px auto",
    padding: "25px",
    background: "#f5faff",
    borderRadius: "12px",
    boxShadow: "0 4px 14px rgba(0,0,0,0.10)",
    fontFamily: "Roboto, sans-serif",
  };

  const title = {
    textAlign: "center",
    color: "#003366",
    fontSize: "26px",
    fontWeight: "600",
    marginBottom: "18px",
  };

  const inputBox = {
    width: "100%",
    padding: "12px",
    marginBottom: "14px",
    borderRadius: "8px",
    border: "1px solid #d0ddf0",
    fontSize: "14px",
    outline: "none",
    transition: "0.2s",
  };

  const inputFocus = {
    border: "1px solid #0066ff",
    boxShadow: "0 0 4px rgba(0,102,255,0.3)",
  };

  const selectBox = {
    ...inputBox,
    background: "#ffffff",
  };

  const textareaBox = {
    ...inputBox,
    resize: "vertical",
    minHeight: "110px",
  };

  const btn = {
    width: "100%",
    padding: "12px",
    background: "#0066ff",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "500",
    marginTop: "5px",
  };

  const successMsg = {
    textAlign: "center",
    color: "green",
    fontWeight: "600",
    marginTop: "12px",
  };

  const errorMsg = {
    textAlign: "center",
    color: "red",
    fontWeight: "600",
    marginTop: "12px",
  };

  return (
    <div style={container}>
      <h2 style={title}>Submit Complaint</h2>

      <form
       onSubmit={handleSubmit}
      >
        
        <input
          type="text"
          name="title"
          placeholder="Complaint Title"
          style={inputBox}
          onFocus={(e) => Object.assign(e.target.style, inputFocus)}
          onBlur={(e) => Object.assign(e.target.style, inputBox)}
          onChange={handleChange}
          required
        />

        <select
          name="category"
          style={selectBox}
          onFocus={(e) => Object.assign(e.target.style, inputFocus)}
          onBlur={(e) => Object.assign(e.target.style, selectBox)}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          <option value="Hostel">Hostel</option>
          <option value="Mess">Mess</option>
          <option value="Transport">Transport</option>
          <option value="Academics">Academics</option>
          <option value="Other">Other</option>
        </select>

        <textarea
          name="description"
          placeholder="Describe your issue"
          style={textareaBox}
          onFocus={(e) => Object.assign(e.target.style, inputFocus)}
          onBlur={(e) => Object.assign(e.target.style, textareaBox)}
          onChange={handleChange}
          required
        ></textarea>

        <button type="submit" style={btn}>
          Submit Complaint
        </button>
      </form>

      {message && (
        <p style={message.includes("successfully") ? successMsg : errorMsg}>
          {message}
        </p>
      )}

    </div>
  );
}

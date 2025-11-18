import { useState } from "react";
import { api } from "../Services/api";

export default function StudentRegister() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    api
      .post("/register/user", form)

      .then(() => setMessage("Student registered successfully!"))
      .catch(() => setMessage("Registration failed!"));
  };

  /* ------------------ THEME STYLE ------------------ */

  const container = {
    width: "420px",
    margin: "55px auto",
    padding: "28px",
    background: "#f5faff",
    borderRadius: "12px",
    boxShadow: "0 4px 14px rgba(0,0,0,0.10)",
    fontFamily: "Roboto, sans-serif",
    textAlign: "center",
  };

  const title = {
    fontSize: "28px",
    fontWeight: "600",
    color: "#003366",
    marginBottom: "22px",
  };

  const inputBox = {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
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
    marginTop: "12px",
    color: "green",
    fontWeight: "600",
  };

  const errorMsg = {
    marginTop: "12px",
    color: "red",
    fontWeight: "600",
  };

  return (
    <div style={container}>
      <h2 style={title}>Student Registration</h2>

      <form
       onSubmit={handleSubmit}
       >

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          style={inputBox}
          onFocus={(e) => Object.assign(e.target.style, inputFocus)}
          onBlur={(e) => Object.assign(e.target.style, inputBox)}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          style={inputBox}
          onFocus={(e) => Object.assign(e.target.style, inputFocus)}
          onBlur={(e) => Object.assign(e.target.style, inputBox)}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Create Password"
          style={inputBox}
          onFocus={(e) => Object.assign(e.target.style, inputFocus)}
          onBlur={(e) => Object.assign(e.target.style, inputBox)}
          onChange={handleChange}
          required
        />

        <button type="submit" style={btn}>
          Register
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

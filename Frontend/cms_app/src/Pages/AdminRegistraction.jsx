import { useState } from "react";
import { api } from "../Services/api";

export default function AdminRegister() {
 const [form, setForm] = useState({
  name: "",
  email: "",
  password: "",
  adminKey: ""   // <-- change here
});


  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  api
    .post("/register/admin", form)
    .then((res) => {
      setMessage("Admin registered successfully!");
    })
    .catch((err) => {
      if (err.response && err.response.data) {
        setMessage(err.response.data);  // show backend message
      } else {
        setMessage("Something went wrong!");
      }
    });
};

  /* ------------------ THEME STYLES ------------------ */

  const container = {
    width: "420px",
    margin: "50px auto",
    padding: "25px",
    background: "#f5faff",
    borderRadius: "12px",
    boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
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
    marginTop: "4px",
  };

  const msgSuccess = {
    textAlign: "center",
    marginTop: "12px",
    color: "green",
    fontWeight: "600",
  };

  const msgError = {
    textAlign: "center",
    marginTop: "12px",
    color: "red",
    fontWeight: "600",
  };

  return (
    <div style={container}>
      <h2 style={title}>Admin Registration</h2>

      <form 
      onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          style={inputBox}
          onFocus={e => Object.assign(e.target.style, inputFocus)}
          onBlur={e => Object.assign(e.target.style, inputBox)}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          style={inputBox}
          onFocus={e => Object.assign(e.target.style, inputFocus)}
          onBlur={e => Object.assign(e.target.style, inputBox)}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          style={inputBox}
          onFocus={e => Object.assign(e.target.style, inputFocus)}
          onBlur={e => Object.assign(e.target.style, inputBox)}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="adminKey"
          placeholder="Admin Secret Code"
          style={inputBox}
          onFocus={e => Object.assign(e.target.style, inputFocus)}
          onBlur={e => Object.assign(e.target.style, inputBox)}
          onChange={handleChange}
          required
        />

        <button type="submit" style={btn}>
          Register Admin
        </button>
      </form>

      {message && (
        <p style={message.includes("success") ? msgSuccess : msgError}>
          {message}
        </p>
      )}
    </div>
  );
}

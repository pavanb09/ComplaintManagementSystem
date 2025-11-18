import { useState } from "react";
import { api } from "../Services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    api.post("/login", form)
      .then(res => {
        console.log(res.o);
        

        if (res.data.status === "success") {
          localStorage.setItem("role", res.data.user.role);
          localStorage.setItem("userId", res.data.user.id);

          if (res.data.user.role === "admin") {
            navigate("/admin/dashboard");
          } else {
            navigate("/student/home");
          }

        } else {
          setError("Invalid Credentials");
        }
      })
      .catch(err => setError("Login Failed"));
  };

  /* ------------------ THEME STYLE ------------------ */

  const container = {
    width: "380px",
    margin: "60px auto",
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
    marginBottom: "20px",
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

  const errorMsg = {
    color: "red",
    marginTop: "12px",
    fontWeight: "600",
    fontSize: "14px",
  };

  const registerLink = {
    marginTop: "18px",
    fontSize: "14px",
    color: "#0066ff",
    cursor: "pointer",
    textDecoration: "underline",
  };

  return (
    <div style={container}>
      <h2 style={title}>Login</h2>

      <form
       onSubmit={handleSubmit}
      >

        <input
          type="email"
          name="email"
          placeholder="Email"
          style={inputBox}
          onFocus={(e) => Object.assign(e.target.style, inputFocus)}
          onBlur={(e) => Object.assign(e.target.style, inputBox)}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          style={inputBox}
          onFocus={(e) => Object.assign(e.target.style, inputFocus)}
          onBlur={(e) => Object.assign(e.target.style, inputBox)}
          onChange={handleChange}
          required
        />

        <button type="submit" style={btn}>Login</button>
      </form>

      {error && <p style={errorMsg}>{error}</p>}

      <p
        style={registerLink}
        onClick={() => navigate("/register/student")}
      >
        New user? Create an account
      </p>
    </div>
  );
}

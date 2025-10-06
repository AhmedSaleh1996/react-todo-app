import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "./Login.css";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const defaultUser = { username: "admin", password: "1234" };
    localStorage.setItem("user", JSON.stringify(defaultUser));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (username !== savedUser.username) {
      toast.error("Username is incorrect!");
      return;
    }

    if (password !== savedUser.password) {
      toast.error("Password is incorrect!");
      return;
    }

    localStorage.setItem("isLoggedIn", "true");
    toast.success("Login successful!");
    onLogin();
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Welcome Back 👋</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              autoFocus
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./App.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    if (email === "Julianne.OConner@kory.org" && password ==="Karianne") {
      setMessage("Login Successful!");
      navigate("/home");
    } else {
      setMessage("Invalid Email or Password!");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        
        <h2>Login</h2>

        <label>Email</label>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}
        >Login</button>

        <p>{message}</p>
        <p className="register-text">
          Don't have an account?{" "}
          <Link to="/signup">Signup</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
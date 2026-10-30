import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./App.css";

const getStoredUsers = () => {
  try {
    return JSON.parse(localStorage.getItem("signupUsers") || "[]");
  } catch {
    return [];
  }
};

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();

    if (!email || !password) {
      setMessage("Please enter both email and password!");
      return;
    }

    const users = getStoredUsers();
    const demoUser = {
      email: "Julianne.OConner@kory.org",
      password: "Karianne",
      name: "Julianne O'Connor",
    };

    const matchedUser = users.find(
      (user) =>
        user.email.toLowerCase() === email.toLowerCase() && user.password === password
    );

    const validUser = matchedUser || (demoUser.email === email && demoUser.password === password);

    if (validUser) {
      const activeUser = matchedUser || demoUser;
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({ name: activeUser.name, email: activeUser.email })
      );
      setMessage("Login Successful!");
      setTimeout(() => navigate("/home"), 350);
    } else {
      setMessage("Invalid Email or Password!");
    }
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleLogin}>
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

        <button type="submit">Login</button>

        <p>{message}</p>
        <p className="register-text">
          Don't have an account? <Link to="/signup">Signup</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;

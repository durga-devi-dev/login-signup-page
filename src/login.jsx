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
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();

    if (!email || !password) {
      setMessage("Please enter both email and password!");
      setMessageType("error");
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
      setMessageType("success");
      setTimeout(() => navigate("/home"), 350);
    } else {
      setMessage("Invalid Email or Password!");
      setMessageType("error");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <span className="eyebrow">Welcome back</span>
          <h2>Login</h2>
        </div>

        <form onSubmit={handleLogin} className="auth-form">
          <div className="field-group">
            <label htmlFor="login-email">Email</label>
            <input
              id="login-email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="field-group">
            <label htmlFor="login-password">Password</label>
            <div className="password-field">
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button type="submit" className="primary-button">
            Login
          </button>

          {message && <p className={`message ${messageType}`}>{message}</p>}

          <p className="switch-text">
            Don&apos;t have an account? <Link to="/signup">Signup</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;

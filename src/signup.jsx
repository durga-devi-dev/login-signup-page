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

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = (event) => {
    event.preventDefault();

    const { name, phone, email, password, confirmPassword } = formData;

    if (!name || !phone || !email || !password || !confirmPassword) {
      setMessage("Please fill all fields!");
      setMessageType("error");
      return;
    }

    if (!/^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(email)) {
      setMessage("Please enter a valid email address!");
      setMessageType("error");
      return;
    }

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters long!");
      setMessageType("error");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
      setMessageType("error");
      return;
    }

    const users = getStoredUsers();
    const alreadyExists = users.some(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );

    if (alreadyExists) {
      setMessage("This email is already registered!");
      setMessageType("error");
      return;
    }

    users.push({ name, phone, email, password });
    localStorage.setItem("signupUsers", JSON.stringify(users));
    setMessage("Sign Up Successful!");
    setMessageType("success");
    setTimeout(() => navigate("/"), 500);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <span className="eyebrow">Create account</span>
          <h2>Sign Up</h2>
        </div>

        <form onSubmit={handleSignup} className="auth-form">
          <div className="field-group">
            <label htmlFor="signup-name">Full Name</label>
            <input
              id="signup-name"
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="field-group">
            <label htmlFor="signup-phone">Phone Number</label>
            <input
              id="signup-phone"
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="field-group">
            <label htmlFor="signup-email">Email</label>
            <input
              id="signup-email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="field-group">
            <label htmlFor="signup-password">Password</label>
            <div className="password-field">
              <input
                id="signup-password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
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

          <div className="field-group">
            <label htmlFor="signup-confirm-password">Confirm Password</label>
            <div className="password-field">
              <input
                id="signup-confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button type="submit" className="primary-button">
            Sign Up
          </button>

          {message && <p className={`message ${messageType}`}>{message}</p>}

          <p className="switch-text">
            Already have an account? <Link to="/">Login here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;

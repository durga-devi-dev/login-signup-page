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
  const [message, setMessage] = useState("");
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
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    const users = getStoredUsers();
    const alreadyExists = users.some(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );

    if (alreadyExists) {
      setMessage("This email is already registered!");
      return;
    }

    users.push({ name, phone, email, password });
    localStorage.setItem("signupUsers", JSON.stringify(users));
    setMessage("Sign Up Successful!");
    setTimeout(() => navigate("/"), 500);
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleSignup}>
        <h2>Sign Up</h2>

        <label>Full Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter Full Name"
          value={formData.name}
          onChange={handleChange}
        />

        <label>Phone Number</label>
        <input
          type="tel"
          name="phone"
          placeholder="Enter Phone Number"
          value={formData.phone}
          onChange={handleChange}
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
        />

        <label>Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />

        <button type="submit">Sign Up</button>

        <p>{message}</p>

        <p className="register-text">
          Already have an account? <Link to="/">Login here</Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;

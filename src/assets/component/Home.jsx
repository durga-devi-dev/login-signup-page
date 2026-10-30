import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const getLoggedInUser = () => {
  try {
    return JSON.parse(localStorage.getItem("loggedInUser") || "null");
  } catch {
    return null;
  }
};

export const Home = () => {
  const [data, setData] = useState(null);
  const [userName, setUserName] = useState(getLoggedInUser()?.name || "User");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/users/4");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setData({ name: "Guest User" });
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/");
  };

  return (
    <div className="home-container">
      <div className="home-card">
        <h1>Welcome</h1>
        <h2>{data ? data.name : "Loading..."}</h2>
        <p>Signed in as: {userName}</p>
        <button type="button" onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
    </div>
  );
};

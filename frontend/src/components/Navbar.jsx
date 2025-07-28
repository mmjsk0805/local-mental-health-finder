import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [userEmail, setUserEmail] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const emailFromUrl = params.get("user_email");
    const emailFromStorage = localStorage.getItem("user_email");

    if (emailFromUrl) {
      localStorage.setItem("user_email", emailFromUrl);
      setUserEmail(emailFromUrl);
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (emailFromStorage) {
      setUserEmail(emailFromStorage);
    }
  }, []);

  const handleLogin = () => {
    window.location.href =
      "https://local-mental-health-finder-1.onrender.com/calendar/auth";
  };

  const handleLogout = () => {
    localStorage.removeItem("user_email");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setUserEmail(null);
    navigate("/"); // Optional: redirect to homepage
  };

  return (
    <header className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">
          💜 Mental Health Finder
        </Link>
      </div>
      <nav className="navbar-right">
        <Link to="/">Home</Link>
        <Link to="/find-therapists">Find Therapists</Link>
        <Link to="/create-event">Create Event</Link>
        <Link to="/chatbot">AI Chatbot</Link>

        {userEmail && userEmail !== "null" && userEmail !== "undefined" ? (
          <div className="user-info">
            <span className="user-email">{userEmail.split("@")[0]}</span>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <button className="login-button" onClick={handleLogin}>
            Login with Google
          </button>
        )}
      </nav>
    </header>
  );
}

export default Navbar;

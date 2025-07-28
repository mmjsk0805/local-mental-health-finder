import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [userEmail, setUserEmail] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get user email from URL or localStorage
    const params = new URLSearchParams(window.location.search);
    const emailFromUrl = params.get("user_email");
    const emailFromStorage = localStorage.getItem("user_email");

    if (emailFromUrl) {
      // Save email from URL to localStorage for persistence
      localStorage.setItem("user_email", emailFromUrl);
      setUserEmail(emailFromUrl);
      // Clean up query params from the URL
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (emailFromStorage) {
      setUserEmail(emailFromStorage);
    }
  }, []);

  // Redirect user to backend Google OAuth endpoint
  const handleLogin = () => {
    window.location.href =
      "https://local-mental-health-finder-1.onrender.com/calendar/auth";
  };

  // Clear tokens and user info on logout
  const handleLogout = () => {
    localStorage.removeItem("user_email");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setUserEmail(null);
    navigate("/");
  };

  return (
    <header className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">
          💜 Mental Health Finder
        </Link>
      </div>

      {/* Navigation links + auth display */}
      <nav className="navbar-right">
        <Link to="/">Home</Link>
        <Link to="/find-therapists">Find Therapists</Link>
        <Link to="/create-event">Create Event</Link>
        <Link to="/chatbot">AI Chatbot</Link>

        {/* Conditional: Show user email and logout if logged in */}
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

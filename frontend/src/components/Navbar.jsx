import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const emailFromUrl = params.get("user_email");
    const emailFromStorage = localStorage.getItem("user_email");

    if (emailFromUrl) {
      localStorage.setItem("user_email", emailFromUrl);
      setUserEmail(emailFromUrl);

      // Remove query params from URL
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (emailFromStorage) {
      setUserEmail(emailFromStorage);
    }
  }, []);

  const handleLogin = () => {
    window.location.href =
      "https://local-mental-health-finder-1.onrender.com/calendar/auth";
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
          <span className="user-email">{userEmail.split("@")[0]}</span>
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

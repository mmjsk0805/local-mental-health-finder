import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
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
      </nav>
    </header>
  );
}

export default Navbar;

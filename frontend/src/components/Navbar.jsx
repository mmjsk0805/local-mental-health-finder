import React from "react";
import { Link } from "react-router-dom";
import "../styles/theme.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          💚 Mental Health Finder
        </Link>
        <ul className="navbar-links">
          <li>
            <Link to="/create-event">Create Event</Link>
          </li>
          <li>
            <Link to="/find-therapists">Find Therapists</Link>
          </li>
          <li>
            <Link to="/chatbot">AI Therapy Chatbot</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

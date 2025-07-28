import React from "react";
import "./Home.css";
import heroImg from "../assets/hero.png";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <main className="home">
      {/* Hero section with headline, description, and CTA button */}
      <section className="hero">
        <div className="hero-text">
          <h1>Your Mental Health Journey Starts Here</h1>
          <p>
            Find compassionate, local mental health support — from therapists
            and events to guided AI conversations.
          </p>
          <button
            className="btn-primary"
            onClick={() => navigate("/get-started")}
          >
            Get Started →
          </button>
        </div>

        {/* Illustration next to hero text */}
        <div className="hero-image">
          <img src={heroImg} alt="Meditating woman illustration" />
        </div>
      </section>

      {/* Feature summary section (below the fold) */}
      <section className="features" id="features">
        <h2>Helping you find local mental health care</h2>
        <p className="subtext">
          Supporting your wellness with features like therapy chatbot
          functionality, therapist search using Yelp API, and Google Calendar
          integration for event scheduling.
        </p>
      </section>
    </main>
  );
}

export default Home;

import React from "react";
import "./Home.css";
import heroImg from "../assets/hero.png";

function Home() {
  return (
    <main className="home">
      <section className="hero">
        <div className="hero-text">
          <h1>Your Mental Health Journey Starts Here</h1>
          <p>
            Find compassionate, local mental health support — from therapists
            and events to guided AI conversations.
          </p>
          <a href="#features" className="btn-primary">
            Get Started →
          </a>
        </div>
        <div className="hero-image">
          <img src={heroImg} alt="Meditating woman illustration" />
        </div>
      </section>

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

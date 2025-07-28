import React from "react";
import heroImg2 from "../assets/get-started-hero.png";
import "./GetStarted.css";
import therapistIcon from "../assets/therapist.png";
import chatbotIcon from "../assets/chatbot.png";
import calendarIcon from "../assets/calendar.png";

function GetStarted() {
  return (
    <main>
      {/* Hero section introducing how to use the app */}
      <section className="get-started-hero">
        <h1>How to Use Mental Health Finder</h1>

        <div className="get-started-container">
          {/* Left side: supporting illustration */}
          <div className="get-started-image">
            <img src={heroImg2} alt="How to use Mental Health Finder" />
          </div>

          {/* Right side: step-by-step usage instructions */}
          <div className="get-started-text-box">
            <ol>
              <li>
                <img
                  src={therapistIcon}
                  alt="Find Therapists"
                  className="step-icon"
                />
                <strong> Find Therapists</strong>
                Enter your city or zip code and describe your symptoms. We’ll
                use Yelp data to suggest nearby therapists that match your
                needs.
              </li>

              <li>
                <img
                  src={chatbotIcon}
                  alt="Find Therapists"
                  className="step-icon"
                />
                <strong>AI Therapy Chatbot</strong>
                Need someone to talk to right away? Use our AI chatbot to
                simulate supportive therapy-style conversations anytime,
                anywhere.
              </li>

              <li>
                <img
                  src={calendarIcon}
                  alt="Find Therapists"
                  className="step-icon"
                />
                <strong>Book Appointments</strong>
                Click on "Create Event" in the top menu to book and manage
                therapy appointments using your Google Calendar.
              </li>
            </ol>

            {/* Link back to homepage */}
            <a href="/" className="back-link">
              ← Back to Home
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

export default GetStarted;

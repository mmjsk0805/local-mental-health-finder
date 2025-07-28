import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import TherapistSearch from "./components/TherapistSearch";
import EventForm from "./components/EventForm";
import AIChatbot from "./components/AIChatbot";
import OAuthSuccess from "./components/OAuthSuccess";
import "./styles/theme.css";
import GetStarted from "./components/GetStarted";

function App() {
  return (
    <div className="app-container">
      {/* Persistent navigation bar at the top */}
      <Navbar />

      <main className="content">
        {/* Route definitions for page navigation */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-event" element={<EventForm />} />
          <Route path="/oauth-success" element={<OAuthSuccess />} />
          <Route path="/find-therapists" element={<TherapistSearch />} />
          <Route path="/create-event" element={<EventForm />} />{" "}
          <Route path="/chatbot" element={<AIChatbot />} />
          <Route path="/get-started" element={<GetStarted />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

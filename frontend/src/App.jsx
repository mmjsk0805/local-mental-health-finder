import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import TherapistSearch from "./components/TherapistSearch";
import EventForm from "./components/EventForm";
import AIChatbot from "./components/AIChatbot";
import OAuthSuccess from "./components/OAuthSuccess";
import "./styles/theme.css";

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-event" element={<EventForm />} />
          <Route path="/oauth-success" element={<OAuthSuccess />} />
          <Route path="/find-therapists" element={<TherapistSearch />} />
          <Route path="/create-event" element={<EventForm />} />
          <Route path="/chatbot" element={<AIChatbot />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

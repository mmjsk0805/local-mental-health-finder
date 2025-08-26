import React, { useState } from "react";
import axios from "axios";
import TherapistCard from "./TherapistCard";
import "./TherapistSearch.css";

function TherapistSearch() {
  const [location, setLocation] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [results, setResults] = useState([]);
  const [aiResponse, setAiResponse] = useState("");
  const [loading, setLoading] = useState(false);

  // Handles form submission and fetches therapist recommendations from backend
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Send location and symptoms to backend for AI + Yelp-based matching
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/recommendation`,
        {
          location,
          messages: [
            {
              role: "system",
              content:
                "You are a helpful assistant that recommends mental health therapists based on a user's symptoms and preferences.",
            },
            {
              role: "user",
              content: `I am seeking therapy for the following symptoms or needs: ${symptoms}`,
            },
          ],
        }
      );

      const businesses = response.data.businesses || [];
      const aiReply = response.data.aiReply || "";
      setAiResponse(aiReply);

      // Extract therapist names from AI response
      const topNames = [...aiReply.matchAll(/\d+\.\s\*\*(.*?)\*\*/g)].map(
        (match) => match[1].toLowerCase().trim()
      );

      // Reorder Yelp businesses to highlight top 3 AI matches
      const aiMatched = [];
      const remaining = [];

      for (const biz of businesses) {
        const idx = topNames.findIndex((name) =>
          biz.name.toLowerCase().includes(name)
        );
        if (idx !== -1) {
          aiMatched[idx] = biz;
        } else {
          remaining.push(biz);
        }
      }

      const ordered = [...aiMatched.filter(Boolean), ...remaining].slice(0, 10);
      setResults(ordered);
    } catch (err) {
      console.error("Error fetching recommendations:", err);
      setAiResponse("Failed to get AI recommendations.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  // Helper to format AI response with bolded therapist names
  function formatAIRecommendation(text) {
    return text.split("\n").map((line, idx) => {
      const match = line.match(/^(\d+)\.\s\*\*(.*?)\*\*\s-\s(.*)/);
      if (match) {
        const [, number, name, rest] = match;
        return (
          <p key={idx} style={{ marginBottom: "1rem" }}>
            <strong>
              {number}. {name}
            </strong>{" "}
            - {rest}
          </p>
        );
      }
      return (
        <p key={idx} style={{ marginBottom: "1rem" }}>
          {line}
        </p>
      );
    });
  }

  // Reusable card styling for feature highlights
  const featureBoxStyle = {
    background: "white",
    borderRadius: "1rem",
    padding: "2rem",
    maxWidth: "320px",
    flex: "1",
    textAlign: "center",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
    color: "#1f2937",
  };

  return (
    <div className="therapist-page">
      <h1 className="therapist-title">Find a Therapist Who Understands You</h1>
      <p className="therapist-subtitle">
        Enter your location and describe your symptoms to get AI-curated
        recommendations.
      </p>

      {/* Search form */}
      <div className="search-card">
        <form
          onSubmit={handleSearch}
          style={{
            marginBottom: "2rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter city or zipcode"
            style={{ padding: "0.5rem", marginRight: "0.5rem" }}
          />
          <input
            type="text"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="Describe your symptoms or needs"
            style={{ padding: "0.5rem", marginRight: "0.5rem" }}
          />
          <button type="submit" style={{ padding: "0.5rem 1rem" }}>
            Search
          </button>
        </form>
      </div>

      {/* Loading state */}
      {loading && (
        <p style={{ color: "#1a2541", fontWeight: "500", textAlign: "center" }}>
          Loading...
        </p>
      )}

      {/* AI response section */}
      {aiResponse && (
        <div className="ai-recommendation">
          <div className="ai-recommendation-header">
            <span>AI Recommendation</span>
          </div>
          <div className="ai-recommendation-body">
            {formatAIRecommendation(aiResponse)}
          </div>
        </div>
      )}

      {/* Therapist result cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "1.5rem",
          marginTop: "2rem",
        }}
      >
        {results.map((biz, index) => (
          <TherapistCard
            key={biz.id}
            therapist={biz}
            index={index}
            isRecommended={index < 3}
          />
        ))}
      </div>
    </div>
  );
}

export default TherapistSearch;

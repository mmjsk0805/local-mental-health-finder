import React, { useState } from "react";
import axios from "axios";
import TherapistCard from "./TherapistCard";

function TherapistSearch() {
  const [location, setLocation] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [results, setResults] = useState([]);
  const [aiResponse, setAiResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/recommendation`, // ✅ correct usage

        {
          location,
          messages: [{ role: "user", content: symptoms }],
        }
      );

      setResults(response.data.businesses || []);
      setAiResponse(response.data.aiReply || "");
    } catch (error) {
      console.error("Error fetching therapists:", error);
      setResults([]);
      setAiResponse("Failed to get recommendations.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <form onSubmit={handleSearch} style={{ marginBottom: "1rem" }}>
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

      {loading && <p>Loading...</p>}

      {aiResponse && (
        <div
          style={{
            marginBottom: "1rem",
            background: "#eef2ff",
            padding: "1rem",
            borderRadius: "8px",
          }}
        >
          <h4>AI Recommendation:</h4>
          <p>{aiResponse}</p>
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "1rem",
        }}
      >
        {results.map((biz, index) => (
          <TherapistCard key={biz.id} therapist={biz} index={index} />
        ))}
      </div>
    </div>
  );
}

export default TherapistSearch;

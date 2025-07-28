const featureBoxStyle = {
  background: "#fff",
  color: "#1f2937", // dark gray text
  padding: "2rem",
  borderRadius: "1rem",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
  width: "300px",
  textAlign: "center",
  fontFamily: "'Inter', sans-serif",
};

export default function FeatureBoxes() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "2rem",
        flexWrap: "nowrap",
        marginTop: "2rem",
        marginBottom: "2rem",
      }}
    >
      <div style={featureBoxStyle}>
        <h3 style={{ fontWeight: "bold", fontSize: "1.25rem" }}>
          Personalized Matching
        </h3>
        <p>Search therapists based on your symptoms and preferences.</p>
      </div>

      <div style={featureBoxStyle}>
        <h3 style={{ fontWeight: "bold", fontSize: "1.25rem" }}>
          Book & Track Sessions
        </h3>
        <p>Easily schedule and manage your appointments via Google Calendar.</p>
      </div>

      <div style={featureBoxStyle}>
        <h3 style={{ fontWeight: "bold", fontSize: "1.25rem" }}>
          AI Therapy Chatbot
        </h3>
        <p>Get real-time support and guidance with our friendly chatbot.</p>
      </div>
    </div>
  );
}

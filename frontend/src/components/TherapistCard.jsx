import React from "react";

function TherapistCard({ therapist, index, isRecommended }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "1rem",
        borderRadius: "8px",
        backgroundColor: "#fff",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "200px",
          backgroundColor: "#f0f0f0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderBottom: "1px solid #ccc",
          borderRadius: "4px",
          overflow: "hidden",
        }}
      >
        {therapist.image_url ? (
          <img
            src={therapist.image_url}
            alt={therapist.name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <span style={{ color: "#999", fontSize: "0.9rem" }}>
            No Image Available
          </span>
        )}
      </div>

      {/* AI Recommendation Badge */}
      {isRecommended && (
        <div
          style={{
            backgroundColor: "#34d399", // Tailwind green-400
            color: "white",
            padding: "0.25rem 0.5rem",
            borderRadius: "12px",
            fontSize: "0.75rem",
            fontWeight: "bold",
            display: "inline-block",
            marginTop: "0.75rem",
            marginBottom: "0.5rem",
          }}
        >
          🌟 AI Recommended
        </div>
      )}

      <h3 style={{ fontWeight: "bold", margin: "0.5rem 0" }}>
        {index + 1}. {therapist.name}
      </h3>
      <p>{therapist.location?.address1}</p>
      <p>{therapist.display_phone}</p>
      <p>⭐ {therapist.rating}</p>
      <a
        href={therapist.url}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "#3b82f6", textDecoration: "underline" }}
      >
        View on Yelp
      </a>
    </div>
  );
}

export default TherapistCard;

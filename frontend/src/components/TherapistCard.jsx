import React from "react";

function TherapistCard({ therapist, index }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "1rem",
        borderRadius: "8px",
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

      <h3>
        {index + 1}. {therapist.name}
      </h3>
      <p>{therapist.location?.address1}</p>
      <p>{therapist.display_phone}</p>
      <p>⭐ {therapist.rating}</p>
      <a href={therapist.url} target="_blank" rel="noopener noreferrer">
        View on Yelp
      </a>
    </div>
  );
}

export default TherapistCard;

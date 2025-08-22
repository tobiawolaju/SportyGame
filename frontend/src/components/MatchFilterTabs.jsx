// src/components/MatchFilterTabs.jsx
import React from "react";

export default function MatchFilterTabs({ active, onChange }) {
  const tabs = ["Upcoming", "Ongoing", "Ended"];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center", // center the tabs
        gap: "1rem",
        marginBottom: "1rem",
        backgroundColor: "#ffe60043", // light background
        padding: "0.5rem 0",
        borderRadius: "25px",
      }}
    >
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab.toLowerCase())}
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "20px",
            border: "none",
            cursor: "pointer",
            backgroundColor: active === tab.toLowerCase() ? "#ffee51ff" : "#ffe6003c",
            color: active === tab.toLowerCase() ? "#000000ff" : "#00000098",
            fontWeight: "bold",
            transition: "0.2s",
          }}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}


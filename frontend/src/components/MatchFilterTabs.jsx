// src/components/MatchFilterTabs.jsx
import React from "react";

export default function MatchFilterTabs({ active, onChange }) {
  const tabs = ["Scrims", "Live Betting", "Leaderboard"];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center", // center the tabs
        gap: "1rem",
        marginBottom: "1rem",
        backgroundColor: "#ffdc742b", // light background
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
            backgroundColor: active === tab.toLowerCase() ? "#ffd574f1" : "#ffdc7478",
            color: active === tab.toLowerCase() ? "#43274aff" : "#57006497",
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


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
        backgroundColor: "#f3f3f3", // light background
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
            backgroundColor: active === tab.toLowerCase() ? "#8a2be2" : "#e7e7e7",
            color: active === tab.toLowerCase() ? "#fff" : "#000",
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

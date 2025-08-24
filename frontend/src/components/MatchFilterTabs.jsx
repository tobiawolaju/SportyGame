// src/components/MatchFilterTabs.jsx
import React from "react";

  const tabs = [
  { key: "upcoming", label: "Upcoming" },
  { key: "fastbet", label: "FastBet" },
  { key: "rankings", label: "Rankings" },
];

export default function MatchFilterTabs({ active, onChange }) {
  return (
    <div style={{ display:"flex", justifyContent:"center", gap:"1rem", marginBottom:"1rem",
                  backgroundColor:"#ffdc742b", padding:"0.5rem 0", borderRadius:"25px" }}>
      {tabs.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          style={{
            padding:"0.5rem 1rem",
            borderRadius:"20px",
            border:"none",
            cursor:"pointer",
            backgroundColor: active === key ? "#ffd574f1" : "#ffdc7478",
            color: active === key ? "#43274aff" : "#57006497",
            fontWeight:"bold",
            transition:"0.2s",
          }}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

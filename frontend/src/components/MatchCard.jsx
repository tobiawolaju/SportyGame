// src/components/MatchCard.jsx
import { useState } from "react";

export default function MatchCard({ match, onJoin }) {
  const [status, setStatus] = useState("idle"); // "idle" | "joining" | "joined"

  async function handleClick() {
    if (status === "joined") return;
    setStatus("joining");
    try {
      await onJoin(match.match_id);
      setStatus("joined");
    } catch (err) {
      console.error("join failed", err);
      alert("Error joining match");
      setStatus("idle");
    }
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        padding: "1rem",
        marginBottom: "1rem",
        boxShadow: "0 6px 15px rgba(0,0,0,0.1)", // elevated
        fontFamily: "'Orbitron', sans-serif",
        transition: "transform 0.2s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-3px)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
    >
      {/* Logo + Match Info */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <img
          src="/logo2.png"
          alt="Logo"
          style={{ width: "50px", height: "50px", borderRadius: "50%" }}
        />
        <div>
          <h4 style={{ margin: 0, color: "#000000" }}>{match.title}</h4>
          <small style={{ color: "#555555" }}>
            {match.mode} • {new Date(match.start_time_utc).toLocaleString()}
          </small>
        </div>
      </div>

      {/* Join Button */}
      <button
        onClick={handleClick}
        disabled={status === "joining" || status === "joined"}
        style={{
          minWidth: "120px",
          padding: "0.5rem 0.5rem",
          borderRadius: "20px",
          border: "none",
          cursor: status === "joined" ? "default" : "pointer",
          background: status === "joined" ? "#a270ffff" : "#e7e7e7ff", // muted for joined
          color: "#000000ff",
          fontSize: "0.8rem",
          transition: "0.2s",
        }}
        onMouseEnter={(e) => {
          if (status === "idle")
            e.target.style.background = "#a270ffff"; // subtle hover
        }}
        onMouseLeave={(e) => {
          if (status === "idle") e.target.style.background = "#e7e7e7ff";
        }}
      >
        {status === "idle" && "JOIN"}
        {status === "joining" && "PROCESSING…"}
        {status === "joined" && "JOINED"}
      </button>
    </div>
  );
}

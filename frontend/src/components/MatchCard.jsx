// src/components/MatchCard.jsx
import { useState } from "react";

const logos = {
  PUBG: "/pubg.jpg",
  FreeFire: "/freefire.jpg",
  CODM: "/codm.jpg",
};

export default function MatchCard({ match, onJoin }) {
  const [status, setStatus] = useState("idle"); // idle | joining | joined

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

  const logoSrc = logos[match.game] || "/default.jpg";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: "12px",
        padding: "1rem",
        marginBottom: "1rem",
        boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
        fontFamily: "'Orbitron', sans-serif",
        transition: "transform 0.2s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-3px)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <img
          src={logoSrc}
          alt={`${match.game} Logo`}
          style={{ width: "50px", height: "50px", borderRadius: "50%" }}
        />
        <div>
          <h4 style={{ margin: 0, color: "#000" }}>{match.title}</h4>
          
          <h4 style={{ margin: 0, color: "#000" }}>{match.game}</h4>
          <small style={{ color: "#555" }}>
            {match.mode} • {new Date(match.start_time_utc).toLocaleString()}
          </small>
        </div>
      </div>

      <button
        onClick={handleClick}
        disabled={status === "joining" || status === "joined"}
        style={{
          width: "auto",
          padding: "5px 15px",
          borderRadius: "20px",
          border: "none",
          cursor: status === "joined" ? "default" : "pointer",
          background: status === "joined" ? "#a270ff" : "#e7e7e7",
          color: "#000",
          fontSize: "0.8rem",
          transition: "0.2s",
        }}
        onMouseEnter={(e) => status === "idle" && (e.target.style.background = "#a270ff")}
        onMouseLeave={(e) => status === "idle" && (e.target.style.background = "#e7e7e7")}
      >
        {status === "idle" && "JOIN"}
        {status === "joining" && "PROCESSING…"}
        {status === "joined" && "JOINED"}
      </button>
    </div>
  );
}

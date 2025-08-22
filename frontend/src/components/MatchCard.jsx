// src/components/MatchCard.jsx
import { useState } from "react";

export default function MatchCard({ match, onJoin }) {
  const [status, setStatus] = useState("idle"); 
  // "idle" | "joining" | "joined"

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
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "1rem",
        marginBottom: "1rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
      <div>
        <h4 style={{ margin: 0 }}>{match.title}</h4>
        <small>
          {match.mode} •{" "}
          {new Date(match.start_time_utc).toLocaleString()}
        </small>
      </div>
      <button
        onClick={handleClick}
        disabled={status === "joining" || status === "joined"}
        style={{
          minWidth: "120px",
          padding: "0.5rem 1rem",
          borderRadius: "6px",
          border: "none",
          cursor: status === "joined" ? "default" : "pointer",
          background:
            status === "joined" ? "#bb8affff" : status === "joining" ? "#dededeff" : "#dededeff",
          color: status === "joined" ? "#000000ff" : "#000000ff",
        }}
      >
        {status === "idle" && "Join"}
        {status === "joining" && "Processing…"}
        {status === "joined" && "Already Joined"}
      </button>
    </div>
  );
}

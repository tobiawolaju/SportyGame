// src/components/MatchCard.jsx
import { useState, useEffect } from "react";

const logos = {
  PUBG: "/pubg.jpg",
  FreeFire: "/freefire.jpg",
  CODM: "/codm.jpg",
};

export default function MatchCard({ match, onJoin }) {
  const [status, setStatus] = useState("idle"); // idle | joining | joined
  const [timeLeft, setTimeLeft] = useState("");

  const logoSrc = logos[match.game] || "/default.jpg";
  const prize = match.prize || "$20"; // dummy fallback

  useEffect(() => {
    function updateCountdown() {
      const start = new Date(match.start_time_utc).getTime();
      const now = Date.now();
      const diff = start - now;

      if (diff <= 0) {
        setTimeLeft("Starting now");
        return;
      }

      const hrs = Math.floor(diff / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);

      if (hrs > 0) {
        setTimeLeft(`${hrs}h ${mins}m`);
      } else if (mins > 0) {
        setTimeLeft(`${mins}m ${secs}s`);
      } else {
        setTimeLeft(`${secs}s`);
      }
    }

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [match.start_time_utc]);

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
        backgroundColor: "#fff",
        borderRadius: "12px",
        padding: "1rem",
        margin: "1rem",
        boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
        fontFamily: "'Orbitron', sans-serif",
        transition: "transform 0.2s",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.transform = "translateY(-3px)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.transform = "translateY(0)")
      }
    >
      {/* left side */}
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
            {match.mode} • {timeLeft}
          </small>
          <div style={{ marginTop: "0.25rem", fontWeight: "200", color: "#1c87c5ff" }}>
            Prize: {prize}
          </div>
        </div>
      </div>

      {/* right side */}
      <button
        onClick={handleClick}
        disabled={status === "joining" || status === "joined"}
        style={{
          padding: "6px 18px",
          borderRadius: "20px",
          border: "none",
          cursor: status === "joined" ? "default" : "pointer",
          background: status === "joined" ? "#a78bfa" : "#e5e7eb",
          color: "#000",
          fontSize: "0.8rem",
          fontWeight: "600",
          transition: "0.2s",
        }}
        onMouseEnter={(e) =>
          status === "idle" && (e.target.style.background = "#a78bfa")
        }
        onMouseLeave={(e) =>
          status === "idle" && (e.target.style.background = "#e5e7eb")
        }
      >
        {status === "idle" && "JOIN"}
        {status === "joining" && "...'."}
        {status === "joined" && "JOINED"}
      </button>
    </div>
  );
}

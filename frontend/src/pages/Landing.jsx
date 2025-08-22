// src/pages/Landing.jsx
import { useEffect, useState } from "react";
import { api } from "../lib/api";
import MatchCard from "../components/MatchCard";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import { usePrivy } from "@privy-io/react-auth";
import LoginButton from "../components/LoginButton";
import LogoutButton from "../components/LogoutButton";

export default function Landing() {
  const [matches, setMatches] = useState(null);
  const { authenticated } = usePrivy();

  useEffect(() => {
    async function fetchMatches() {
      const data = await api.getMatches();
      setMatches(data);
    }
    fetchMatches();
  }, []);

  if (matches === null) {
    return <Loading message="Loading lobby…" />;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#fff",
        color: "#111",
        padding: "2rem",
      }}
    >
      {/* hero */}
      <header style={{ textAlign: "center", marginBottom: "2.5rem" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>
          SportyGame
        </h1>
        <p style={{ fontSize: "1.25rem", color: "#555", marginBottom: "1rem" }}>
          PUBG scrims. Earn rewards. Monthly pass required.
        </p>
      </header>

      {/* upcoming matches */}
      <section style={{ maxWidth: "900px", margin: "0 auto" }}>
        <h2 style={{ marginBottom: "1rem", textAlign: "left" }}>
          Upcoming Scrims
        </h2>
        {matches.length === 0 ? (
          <p>No matches yet. Check back later.</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {matches.slice(0, 6).map((m) => (
              <MatchCard key={m.match_id} match={m} />
            ))}
          </div>
        )}
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
        
        {authenticated ? <LogoutButton /> : <LoginButton />}
        </div>
      </section>
    </div>
  );
}

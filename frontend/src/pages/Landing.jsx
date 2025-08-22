// src/pages/Landing.jsx
import { useEffect, useState } from "react";
import { api } from "../lib/api";
import MatchCard from "../components/MatchCard";
import Loading from "../components/Loading";
import { usePrivy } from "@privy-io/react-auth";
import LoginButton from "../components/LoginButton";
import LogoutButton from "../components/LogoutButton";

export default function Landing() {
  const [matches, setMatches] = useState(null);
  const { authenticated } = usePrivy();

  useEffect(() => {
    api.getMatches().then(setMatches);
  }, []);

  if (matches === null) return <Loading message="Loading lobby…" />;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#ffffff",
        color: "#111827",
        fontFamily: "Inter, sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* hero center screen */}
      <header
        style={{
          flex: "1 0 auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "4rem 1rem",
          
        }}
      >
        <p
          style={{
            fontSize: "1.25rem",
            color: "#4b5563",
            marginBottom: "0.5rem",
          }}
        >
          can you actually play PUBG or CODM, or are you just a…
        </p>
        <h1
          style={{
            fontSize: "clamp(3rem, 8vw, 6rem)",
            fontWeight: "800",
            margin: 0,
            lineHeight: 1.1,
          }}
        >
          another wannabe gamer?
        </h1>
        <div style={{ marginTop: "2rem" }}>
          {authenticated ? <LogoutButton /> : <LoginButton />}
        </div>
      </header>

      {/* matches panel */}
      <section
        style={{
          flex: "0 0 auto",
          width: "100vw",
          maxWidth: "960px",
          margin: "0 auto 4rem",
          background: "#f9fafb",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <h2
          style={{
            margin: "1.5rem",
            marginBottom:'0.5rem',
            fontSize: "1rem",
            fontWeight: "600",
            color: "#111827",
          }}
        >
          Upcoming Scrims
        </h2>
        {matches.length === 0 ? (
          <p style={{ color: "#6b7280" }}>No matches yet. Check back soon.</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {matches.slice(0, 6).map((m) => (
              <MatchCard key={m.match_id} match={m} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

// src/components/OngoingMatches.jsx

import MatchCard from "../components/MatchCard";


export default function OngoingMatches({ matches }) {
  return matches.length ? (
    matches.map((m) => (
      <div
        key={m.match_id}
        style={{
          border: "1px solid #ccc",
          padding: "1rem",
          marginBottom: "1rem",
          borderRadius: "8px",
        }}
      >
        <h3>{m.title}</h3>
        <p>this is a bet sample</p>
      </div>
    ))
  ) : (
    <p>Betting disabled</p>
  );
}

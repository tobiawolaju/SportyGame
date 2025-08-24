// src/components/EndedMatches.jsx

import MatchCard from "../components/MatchCard";


export default function EndedMatches({ matches }) {
  return matches.length ? (
    matches.map((m) => (
      <div
        key={m.match_id}
        style={{
          border: "1px dashed #aaa",
          padding: "1rem",
          marginBottom: "1rem",
          borderRadius: "8px",
        }}
      >
        <h3>{m.title}</h3>
        <p>Ended. Winners: TBD</p>
      </div>
    ))
  ) : (
    <p>No ended matches</p>
  );
}
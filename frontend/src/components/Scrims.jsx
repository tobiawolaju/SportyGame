// src/components/UpcomingMatches.jsx

import MatchCard from "../components/MatchCard";

export default function UpcomingMatches({ matches, onJoin }) {
  return matches.length ? (
    matches.map((m) => <MatchCard key={m.match_id} match={m} onJoin={onJoin} />)
  ) : (
    <p>No upcoming matches</p>
  );
}







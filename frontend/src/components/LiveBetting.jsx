import { api } from "../lib/api";
import MatchCard from "./MatchCard";

export default function Scrims({ user, matches }) {
  const wallet = user?.wallet?.address;

  if (!matches) return <p>Loading bets...</p>;

  async function handleJoin(matchId) {
    await api.joinMatch(wallet, matchId);
  }

  return matches.length === 0 ? (
    <p>No matches available</p>
  ) : (
    matches.map(m => (
      <MatchCard key={m.match_id} match={m} onJoin={handleJoin} />
    ))
  );
}

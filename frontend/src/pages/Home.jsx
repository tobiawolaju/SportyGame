import { useEffect, useState } from "react";
import { api } from "../lib/api";
import MatchCard from "../components/MatchCard";
import Loading from "../components/Loading";
import MatchFilterTabs from "../components/MatchFilterTabs";

export default function Home({ user }) {
  const [matches, setMatches] = useState(null);
  const [filter, setFilter] = useState("upcoming"); // tab filter
  const wallet = user?.wallet?.address;

  useEffect(() => {
    async function fetchMatches() {
      const data = await api.getMatches();
      setMatches(data);
    }
    fetchMatches();
  }, []);

  async function handleJoin(matchId) {
    try {
      await api.joinMatch(wallet, matchId);
      return true;
    } catch (err) {
      throw err;
    }
  }

  if (!matches) return <Loading message="Fetching matches..." />;

  const filteredMatches = matches.filter((m) => m.status === filter);

  return (
    <div style={{ padding: "1.5rem" }}>
      <MatchFilterTabs active={filter} onChange={setFilter} />

      {filteredMatches.length === 0 ? (
        <p>No {filter} matches</p>
      ) : (
        filteredMatches.map((m) => (
          <MatchCard key={m.match_id} match={m} onJoin={handleJoin} />
        ))
      )}
    </div>
  );
}

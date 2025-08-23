// src/pages/Home.jsx
import { useEffect, useState } from "react";
import { api } from "../lib/api";
import Loading from "../components/Loading";
import MatchFilterTabs from "../components/MatchFilterTabs";

import UpcomingMatches from "../components/Scrims";
import OngoingMatches from "../components/LiveBetting";
import EndedMatches from "../components/Leaderboard";

export default function Home({ user }) {
  const [matches, setMatches] = useState(null);
  const [filter, setFilter] = useState("upcoming");
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

      {filter === "upcoming" && (
        <UpcomingMatches matches={filteredMatches} onJoin={handleJoin} />
      )}
      {filter === "fastbet" && <OngoingMatches matches={filteredMatches} />}
      {filter === "ended" && <EndedMatches matches={filteredMatches} />}
    </div>
  );
}

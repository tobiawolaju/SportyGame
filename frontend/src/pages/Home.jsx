// src/pages/Home.jsx
import { useEffect, useState } from "react";
import { api } from "../lib/api";
import Loading from "../components/Loading";
import MatchFilterTabs from "../components/MatchFilterTabs";

import UpcomingMatches from "../components/Scrims";
import OngoingMatches from "../components/FastBet";
import EndedMatches from "../components/Rankings";

export default function Home({ user }) {
  const [matches, setMatches] = useState(null);
  const [filter, setFilter] = useState("upcoming");
  const wallet = user?.wallet?.address;

  useEffect(() => {
    async function fetchMatches() {
      let data;
      if (filter === "upcoming") {
        data = await api.getUpcomingMatches();
      } else if (filter === "fastbet") {
        data = await api.getFastBetMatches();
      } else if (filter === "rankings") {
        data = await api.getRankings();
      }
      setMatches(data);
    }
    fetchMatches();
  }, [filter]);

  async function handleJoin(matchId) {
    await api.joinMatch(wallet, matchId);
  }

  if (!matches) return <Loading message="Fetching matches..." />;

  return (
    <div style={{ padding: "1.5rem" }}>
      <MatchFilterTabs active={filter} onChange={setFilter} />

      {filter === "upcoming" && (
        <UpcomingMatches matches={matches} onJoin={handleJoin} />
      )}
      {filter === "fastbet" && <OngoingMatches matches={matches} />}
      {filter === "rankings" && <EndedMatches matches={matches} />}
    </div>
  );
}

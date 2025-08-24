import { useEffect, useState } from "react";
import { api } from "../lib/api";
import Loading from "../components/Loading";
import MatchFilterTabs from "../components/MatchFilterTabs";
import ErrorMessage from "../components/ErrorMessage";

import UpcomingMatches from "../components/Scrims";
import OngoingMatches from "../components/FastBet";
import EndedMatches from "../components/Rankings";

export default function Home({ user }) {
  const [matches, setMatches] = useState(null);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("upcoming");
  const wallet = user?.wallet?.address;

  useEffect(() => {
    let cancelled = false;

    async function fetchMatches() {
      setMatches(null);      // clear old results
      setError(null);        // reset error
      try {
        let data;
        if (filter === "upcoming") {
          data = await api.getUpcomingMatches();
        } else if (filter === "fastbet") {
          data = await api.getFastBetMatches();
        } else if (filter === "rankings") {
          data = await api.getRankings();
        }
        if (!cancelled) setMatches(data);
      } catch (err) {
        if (!cancelled) {
          setError(`Failed to load ${filter} matches. Please try again later.`);
          setMatches([]); // keep state consistent
        }
      }
    }

    fetchMatches();
    return () => { cancelled = true; };
  }, [filter]);

  async function handleJoin(matchId) {
    await api.joinMatch(wallet, matchId);
  }

  return (
    <div style={{ padding: "1.5rem" }}>
      <MatchFilterTabs active={filter} onChange={setFilter} />

      {error && <ErrorMessage message={error} />}
      {!error && matches === null && (
        <Loading message={`Fetching ${filter} matches...`} />
      )}

      {!error && matches && (
        <>
          {filter === "upcoming" && (
            <UpcomingMatches matches={matches} onJoin={handleJoin} />
          )}
          {filter === "fastbet" && <OngoingMatches matches={matches} />}
          {filter === "rankings" && <EndedMatches matches={matches} />}
        </>
      )}
    </div>
  );
}

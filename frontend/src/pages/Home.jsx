import { useEffect, useState } from "react";
import { api } from "../lib/api";
import MatchCard from "../components/MatchCard";
import Loading from "../components/Loading";

export default function Home({ user }) {
  const [matches, setMatches] = useState(null);   // null = not fetched yet
  const [me, setMe] = useState(null);
  const wallet = user?.wallet?.address;

  useEffect(() => {
    async function ensureUser() {
      const all = await api.getUsers();
      const exists = all.find(u => u.wallet.toLowerCase() === wallet.toLowerCase());
      if (!exists) {
        await api.createUser({
          wallet,
          privy_user_id: user.id,
          status: "active",
          pass_expires_at: null
        });
        setMe({ wallet, privy_user_id: user.id });
      } else {
        setMe(exists);
      }
    }
    if (wallet) ensureUser();
  }, [wallet, user]);

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
    return true; // signal success
  } catch (err) {
    throw err;
  }
}


  if (matches === null) {
    return <Loading message="Fetching matches..." />;
  }

  return (
    <div style={{ padding: "1.5rem" }}>
      <h2>welcome {wallet?.slice(0,6)}…</h2>
      <h3>upcoming matches</h3>
      {matches.length === 0 ? (
        <p>No matches available</p>
      ) : (
        matches.map(m => (
          <MatchCard key={m.match_id} match={m} onJoin={handleJoin} />
        ))
      )}
    </div>
  );
}

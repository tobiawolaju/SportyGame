import { useEffect, useState } from "react";
import { SportyAPI } from "../api/sportygame";
import { useAuth } from "../hooks/useAuth";

type Match = {
  match_id: string;
  title: string;
  status: string;
  start_time_utc: string;
  entry_cap: number;
  join_deadline_utc: string;
};

export default function MatchList() {
  const [matches, setMatches] = useState<Match[]>([]);
  const { wallet, authenticated } = useAuth();

  useEffect(() => {
    SportyAPI.getMatches().then(setMatches).catch(console.error);
  }, []);

  const join = async (id: string) => {
    if (!wallet) return;
    await SportyAPI.joinMatch(wallet, id);
    alert("Joined " + id);
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-2">Upcoming Matches</h2>
      {matches.map((m) => (
        <div key={m.match_id} className="border p-3 mb-2 rounded">
          <div>{m.title}</div>
          <div className="text-sm">Starts: {m.start_time_utc}</div>
          {authenticated && (
            <button
              className="bg-blue-500 text-white px-2 py-1 rounded mt-1"
              onClick={() => join(m.match_id)}
            >
              Join
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

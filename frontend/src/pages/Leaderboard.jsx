import { useEffect, useState } from "react";

const BASE_URL = "https://sportygame.onrender.com/api";

export default function Leaderboard() {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // fetch entries
        const res = await fetch(`${BASE_URL}/entries`);
        const entries = await res.json();

        // filter winners
        const wins = entries.filter(e => e.result === "win");

        // aggregate wins per wallet
        const winCount = {};
        wins.forEach(e => {
          if (!winCount[e.wallet]) winCount[e.wallet] = 0;
          winCount[e.wallet] += 1;
        });

        // fetch payouts to sum prize money
        const payoutRes = await fetch(`${BASE_URL}/payouts`);
        const payouts = await payoutRes.json();
        const payoutSum = {};
        payouts.forEach(p => {
          if (!payoutSum[p.wallet]) payoutSum[p.wallet] = 0;
          payoutSum[p.wallet] += p.amount;
        });

        // combine
        const leaderboard = Object.keys(winCount).map(wallet => ({
          wallet,
          wins: winCount[wallet],
          payouts: payoutSum[wallet] || 0,
        }));

        // sort by wins first, then payouts
        leaderboard.sort((a, b) => {
          if (b.wins !== a.wins) return b.wins - a.wins;
          return b.payouts - a.payouts;
        });

        setLeaders(leaderboard);
      } catch (err) {
        console.error("Error loading leaderboard:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <p>Loading leaderboard…</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Leaderboard</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ textAlign: "left" }}>Wallet</th>
            <th>Wins</th>
            <th>Payouts</th>
          </tr>
        </thead>
        <tbody>
          {leaders.map((row, idx) => (
            <tr key={row.wallet} style={{ borderBottom: "1px solid #ddd" }}>
              <td>{row.wallet}</td>
              <td style={{ textAlign: "center" }}>{row.wins}</td>
              <td style={{ textAlign: "center" }}>${row.payouts}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

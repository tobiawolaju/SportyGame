// src/pages/Profile.jsx
import { useEffect, useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { api } from "../lib/api";
import Loading from "../components/Loading";
import LogoutButton from "../components/LogoutButton";

const gameList = ["PUBG", "CODM", "FreeFire"];

export default function Profile() {
  const { user } = usePrivy();
  const wallet = user?.wallet?.address?.toLowerCase();

  const [me, setMe] = useState(null);
  const [entries, setEntries] = useState([]);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (!wallet) return;

    async function fetchData() {
      try {
        const allUsers = await api.getUsers();
        const meData = allUsers.find((u) => u.wallet.toLowerCase() === wallet);
        setMe(meData || { wallet });

        const allMatches = await api.getMatches();
        const myEntries = allMatches
          .filter((m) => m.entries?.some((e) => e.wallet.toLowerCase() === wallet))
          .map((m) => ({
            match_id: m.match_id,
            match_title: m.title,
            game: m.game,
            mode: m.mode,
            region: m.region,
            result: "pending",
          }));
        setEntries(myEntries);

        // fetch balance from API if available
        if (meData?.balance != null) setBalance(meData.balance);
      } catch (err) {
        console.error("Profile fetch error:", err);
      }
    }

    fetchData();
  }, [wallet]);

  if (!me) return <Loading message="Loading profile..." />;

  return (
    <div style={{ padding: "1.5rem", maxWidth: "900px", margin: "0 auto", fontFamily: "'Orbitron', sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <h2>Profile</h2>
        <LogoutButton />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
        {gameList.map((game) => (
          <div key={game} style={{ padding: "1rem", border: "1px solid #ddd", borderRadius: "12px" }}>
            <h4>{game} Username</h4>
            <p>{me[game.toLowerCase()] || "Not set"}</p>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: "1.5rem" }}>
        <p><strong>Wallet:</strong> {wallet}</p>
        <p><strong>Balance:</strong> {balance} USDT</p>
        <p>
          <strong>Subscription:</strong>{" "}
          {me.pass_expires_at ? `Active until ${new Date(me.pass_expires_at).toLocaleString()}` : "No active pass"}
        </p>
      </div>

      <h3>My Matches</h3>
      {entries.length === 0 ? (
        <p>No matches joined yet</p>
      ) : (
        <div style={{ display: "grid", gap: "1rem" }}>
          {entries.map((e) => (
            <div
              key={e.match_id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "1rem",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                background: "#fff",
              }}
            >
              <div>
                <h4 style={{ margin: 0 }}>{e.match_title}</h4>
                <small>{e.game} • {e.mode} • {e.region}</small>
              </div>
              <span style={{ fontWeight: "bold" }}>{e.result}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

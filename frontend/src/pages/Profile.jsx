import { useEffect, useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { api } from "../lib/api";
import Loading from "../components/Loading";
import LogoutButton from "../components/LogoutButton"; // import here

export default function Profile() {
  const { user } = usePrivy();
  const wallet = user?.wallet?.address?.toLowerCase();

  const [me, setMe] = useState(null);
  const [entries, setEntries] = useState([]);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (!wallet) return;

    async function fetchData() {
      const allUsers = await api.getUsers();
      const meData = allUsers.find(
        (u) => u.wallet.toLowerCase() === wallet
      );
      setMe(meData || { wallet });

      const allMatches = await api.getMatches();
      const myEntries = allMatches
        .filter((m) => m.entries?.some((e) => e.wallet === wallet))
        .map((m) => ({
          match_id: m.match_id,
          match_title: m.title,
          result: "pending",
        }));
      setEntries(myEntries);

      setBalance(0);
    }

    fetchData().catch((err) => {
      console.error("Profile fetch error:", err);
    });
  }, [wallet]);

  if (!me) {
    return <Loading message="Loading profile..." />;
  }

  return (
    <div style={{ padding: "1.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Profile</h2>
        <LogoutButton /> {/* logout btn placed here */}
      </div>

      <p><strong>Wallet:</strong> {wallet}</p>
      <p><strong>Balance:</strong> {balance} USDT</p>
      <p>
        <strong>Subscription:</strong>{" "}
        {me.pass_expires_at
          ? `Active until ${new Date(me.pass_expires_at).toLocaleString()}`
          : "No active pass"}
      </p>

      <h3>My Entries</h3>
      {entries.length === 0 ? (
        <p>No matches joined yet</p>
      ) : (
        <ul>
          {entries.map((e) => (
            <li key={e.match_id}>
              {e.match_title} — result: {e.result}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

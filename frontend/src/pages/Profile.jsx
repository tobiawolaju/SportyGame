import { useEffect, useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { api } from "../lib/api";
import Loading from "../components/Loading";
import LogoutButton from "../components/LogoutButton";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts";

const gameList = ["PUBG", "CODM", "FreeFire"];

export default function Profile() {
  const { user } = usePrivy();
  const wallet = user?.wallet?.address?.toLowerCase();

  const [me, setMe] = useState(null);
  const [balance, setBalance] = useState(0);
  const [exportedKey, setExportedKey] = useState(null);

  useEffect(() => {
    if (!wallet) return;
    async function fetchData() {
      try {
        const allUsers = await api.getUsers();
        const meData = allUsers.find((u) => u.wallet.toLowerCase() === wallet);
        setMe(meData || { wallet });
        if (meData?.balance != null) setBalance(meData.balance);
      } catch (err) {
        console.error("Profile fetch error:", err);
      }
    }
    fetchData();
  }, [wallet]);

  const handleExportWallet = async () => {
    try {
      if (!user?.wallet?.export) {
        alert("Export not available for this wallet");
        return;
      }
      const exported = await user.wallet.export();
      setExportedKey(exported.privateKey || JSON.stringify(exported));
    } catch (err) {
      console.error("Wallet export error:", err);
      alert("Failed to export wallet");
    }
  };

  if (!me) return <Loading message="Loading profile..." />;

  // basic stats
  const statsData = [
    { name: "Wins", value: me.wins || 0 },
    { name: "Losses", value: me.losses || 0 },
  ];
  const winRate =
    me.wins && me.losses
      ? Math.round((me.wins / (me.wins + me.losses)) * 100)
      : 0;

  // fake 7-day data generator
  function generateFake7DayData(me, winRate) {
    const days = Array.from({ length: 7 }, (_, i) => `Day ${i + 1}`);
    const avgEarnings = (me.earnings || 0) / 7;
    const rankNumeric =
      typeof me.rank === "number"
        ? me.rank
        : 0; // assume numeric rank, fallback 0
    const avgRank = rankNumeric / 7;

    return days.map((day, idx) => ({
      day,
      winRate: Math.min(winRate, Math.round(((idx + 1) / 7) * winRate)),
      earnings: Math.round(avgEarnings * (idx + 1)),
      rank: Math.round(avgRank * (idx + 1)),
    }));
  }

  const sevenDayData = generateFake7DayData(me, winRate);

  return (
    <div
      style={{
        padding: "2rem 1rem",
        maxWidth: "900px",
        margin: "0 auto",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <h1 style={{ fontSize: "1.75rem", fontWeight: 700 }}>My Profile</h1>
        <LogoutButton />
      </div>

      {/* wallet */}
      <div
        style={{
          padding: "1.5rem",
          borderRadius: "12px",
          background: "#fff",
          marginBottom: "2rem",
          boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
        }}
      >
        <p style={{ wordBreak: "break-all", margin: "0 0 0.5rem" }}>
          <strong>Wallet:</strong> {wallet}
        </p>
        <p style={{ margin: "0 0 0.5rem" }}>
          <strong>Balance:</strong> {balance} USDT
        </p>
        <button
          onClick={handleExportWallet}
          style={{
            padding: "0.6rem 1.25rem",
            borderRadius: "8px",
            border: "none",
            background: "#111827",
            color: "#fff",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Export Wallet
        </button>
        {exportedKey && (
          <div
            style={{
              marginTop: "1rem",
              padding: "0.75rem",
              borderRadius: "8px",
              background: "#f9fafb",
              fontFamily: "monospace",
              fontSize: "0.875rem",
              wordBreak: "break-all",
            }}
          >
            <strong>Private Key:</strong> {exportedKey}
          </div>
        )}
      </div>

      {/* stats */}
      <div
        style={{
          padding: "1.5rem",
          borderRadius: "12px",
          background: "#fff",
          marginBottom: "2rem",
          boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
        }}
      >
        <h3 style={{ margin: "0 0 1rem" }}>Stats</h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px,1fr))",
            gap: "1rem",
            marginBottom: "1.5rem",
          }}
        >
          <div>
            <strong>Win Rate:</strong> {winRate}%
          </div>
          <div>
            <strong>Rank:</strong> {me.rank || "Unranked"}
          </div>
          <div>
            <strong>Earnings:</strong> {me.earnings || 0} USDT
          </div>
        </div>

    
        {/* line chart over 7 days */}
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <LineChart data={sevenDayData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="winRate"
                stroke="green"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="earnings"
                stroke="blue"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="rank"
                stroke="black"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* usernames */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        {gameList.map((game) => (
          <div
            key={game}
            style={{
              padding: "1rem",
              borderRadius: "12px",
              background: "#fff",
              boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
            }}
          >
            <h4 style={{ margin: "0 0 0.5rem" }}>{game} Username</h4>
            <p style={{ margin: 0, color: "#374151" }}>
              {me[game.toLowerCase()] || "Not set"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

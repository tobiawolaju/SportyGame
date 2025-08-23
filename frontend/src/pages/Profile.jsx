import { useEffect, useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { api } from "../lib/api";
import Loading from "../components/Loading";
import LogoutButton from "../components/LogoutButton";
import {
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
  XAxis,
  YAxis,
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

  const winRate =
    me.wins && me.losses
      ? Math.round((me.wins / (me.wins + me.losses)) * 100)
      : 0;

  // fake but varied 7-day data
  function generateFake7DayData(me, winRate) {
    const days = Array.from({ length: 7 }, (_, i) => `Day ${i + 1}`);
    const avgEarnings = (me.earnings || 100) / 7;
    const baseRank = typeof me.rank === "number" ? me.rank : 20;

    return days.map((day, idx) => ({
      day,
      winRate: Math.round(
        winRate * (0.7 + Math.random() * 0.6) * ((idx + 1) / 7)
      ),
      earnings: Math.round(avgEarnings * (idx + 1) * (0.8 + Math.random() * 0.4)),
      rank: Math.round(baseRank - idx + Math.random() * 5),
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
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <img
            src="pfp.png"
            alt="Profile"
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
          <div>
            <h1 style={{ fontSize: "1rem", fontWeight: 700, margin: 0 }}>
              Player 2368
            </h1>
            <p style={{ margin: 0, color: "#6b7280", fontSize: "0.7rem" }}>
              Gamer / Battle Royale Enthusiast
            </p>
          </div>
        </div>
        <LogoutButton />
      </div>

      {/* wallet */}
      <div
        style={{
          padding: "0.3rem",
          borderRadius: "12px",
          background: "#fff",
          marginBottom: "2rem",
          color: "#573861ff",
          boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
        }}
      >
        <p
          style={{
            fontSize: "1rem",
            wordBreak: "break-all",
            margin: "0 0 0.5rem",
          }}
        >
          <strong>Address:</strong> {wallet}
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <p style={{ margin: 0, fontSize: "1rem", fontWeight: 600 }}>
            {balance} MON
          </p>
          <button
            onClick={handleExportWallet}
            style={{
              padding: "12px 30px",
              backgroundColor: "#f7e4ffff",
              color: "#000",
              border: "none",
              borderRadius: "50px",
              cursor: "pointer",
            }}
          >
            Export Wallet
          </button>
        </div>

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

      {/* stats chart */}
      <div
        style={{
          padding: "0rem",
          borderRadius: "12px",
          background: "#fffcf4ff",
          marginBottom: "2rem",
          boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
        }}
      >
        <div style={{ width: "100%", height: 400 }}>
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
                stroke="#16a34a"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="earnings"
                stroke="#2563eb"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="rank"
                stroke="#111827"
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

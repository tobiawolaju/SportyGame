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

  return (
    <div
      style={{
        padding: "2rem 1rem",
        maxWidth: "800px",
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

      {/* game usernames */}
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
              boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
              background: "#fff",
            }}
          >
            <h4 style={{ margin: "0 0 0.5rem", fontWeight: 600 }}>{game} Username</h4>
            <p style={{ margin: 0, color: "#374151" }}>
              {me[game.toLowerCase()] || "Not set"}
            </p>
          </div>
        ))}
      </div>

      {/* wallet + sub info */}
      <div
        style={{
          padding: "1.5rem",
          borderRadius: "12px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
          background: "#fff",
          marginBottom: "2rem",
        }}
      >
  <p style={{ 
  margin: "0 0 0.5rem", 
  wordBreak: "break-all", 
  overflowWrap: "anywhere" 
}}>
  <strong>Wallet:</strong> {wallet}
</p>

        <p style={{ margin: "0 0 0.5rem" }}>
          <strong>Balance:</strong> {balance} USDT
        </p>
        <p style={{ margin: "0 0 1rem" }}>
          <strong>Subscription:</strong>{" "}
          {me.pass_expires_at
            ? `Active until ${new Date(me.pass_expires_at).toLocaleDateString()}`
            : "No active pass"}
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
            transition: "background 0.2s ease",
          }}
          onMouseOver={(e) => (e.currentTarget.style.background = "#1f2937")}
          onMouseOut={(e) => (e.currentTarget.style.background = "#111827")}
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
    </div>
  );
}

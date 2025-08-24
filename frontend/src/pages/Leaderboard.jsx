import { useState } from "react";
import CongratulationsModal from "../components/congrats";



// dummy data
const dummyData = {
  scrims: [
    {
      id: 1,
      date: "04 Aug",
      title: "PUBG Solo Scrim",
      status: "settled",
      result: "won",
      stake: 5,
      return: 15,
    },
    {
      id: 2,
      date: "05 Aug",
      title: "CODM Squad Scrim",
      status: "settled",
      result: "lost",
      stake: 10,
      return: 0,
    },
    {
      id: 3,
      date: "06 Aug",
      title: "Free Fire Duo",
      status: "unsettled",
      result: "pending",
      stake: 3,
      return: null,
    },
    {
      id: 4,
      date: "07 Aug",
      title: "Warzone Mobile TDM",
      status: "settled",
      result: "won",
      stake: 8,
      return: 24,
    },
  ],
  bets: [
    {
      id: 10,
      date: "02 Aug",
      title: "Warzone Wager",
      status: "settled",
      result: "lost",
      stake: 20,
      return: 0,
      player: "PlayerX",
    },
    {
      id: 11,
      date: "03 Aug",
      title: "Minecraft Build Battle",
      status: "unsettled",
      result: "pending",
      stake: 2,
      return: null,
      player: "BuilderPro",
    },
    {
      id: 12,
      date: "05 Aug",
      title: "Free Fire Clash Squad",
      status: "settled",
      result: "won",
      stake: 7,
      return: 21,
      player: "SniperKing",
    },
    {
      id: 13,
      date: "06 Aug",
      title: "CODM Tournament Final",
      status: "settled",
      result: "won",
      stake: 15,
      return: 45,
      player: "SharpShooter",
    },
  ],
};

// tab bar component
const TabBar = ({ options, active, onChange }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      gap: "1rem",
      marginBottom: "1rem",
      backgroundColor: "#ffdc742b",
      padding: "0.5rem",
      borderRadius: "25px",
    }}
  >
    {options.map(({ key, label }) => (
      <button
        key={key}
        onClick={() => onChange(key)}
        style={{
          padding: "0.5rem 1.2rem",
          borderRadius: "20px",
          border: "none",
          cursor: "pointer",
          backgroundColor: active === key ? "#ffd574f1" : "#ffdc7478",
          color: active === key ? "#43274aff" : "#57006497",
          fontWeight: "bold",
          transition: "0.2s",
        }}
      >
        {label}
      </button>
    ))}
  </div>
);

export default function MyScrims() {
  const [mainTab, setMainTab] = useState("scrims");
  const [filter, setFilter] = useState("all");
  const [winAmount, setWinAmount] = useState(null); // for modal

  const data = dummyData[mainTab].filter((item) => {
    if (filter === "all") return true;
    return item.status === filter;
  });

  return (
    <div style={{ padding: "1rem", fontFamily: "sans-serif" }}>
  
      {/* Main Tabs */}
      <TabBar
        options={[
          { key: "scrims", label: "Scrims" },
          { key: "bets", label: "Bet History" },
        ]}
        active={mainTab}
        onChange={setMainTab}
      />

      {/* Filter Tabs */}
      <TabBar
        options={[
          { key: "all", label: "All" },
          { key: "settled", label: "Settled" },
          { key: "unsettled", label: "Unsettled" },
        ]}
        active={filter}
        onChange={setFilter}
      />

      {/* Data List */}
      <div
        style={{
          background: "#ffdc742b",
          borderRadius: "15px",
          padding: "1rem",
        }}
      >
        {data.length ? (
          data.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0.8rem 1rem",
                marginBottom: "0.7rem",
                borderRadius: "12px",
                backgroundColor:
                  item.result === "won"
                    ? "#d0ffd6"
                    : item.result === "lost"
                    ? "#ffd0d0"
                    : "#fff5d0",
                color: "#43274a",
              }}
            >
              {/* LEFT: date */}
              <div style={{ minWidth: "70px", fontWeight: "bold" }}>
                {item.date}
              </div>

              {/* CENTER: title + stake/return */}
              <div style={{ flex: 1, marginLeft: "1rem" }}>
                <div style={{ fontWeight: "bold" }}>{item.title}</div>
                <div style={{ fontSize: "0.9rem", opacity: 0.8 }}>
                  Stake: {item.stake} USDT | Return:{" "}
                  {item.return !== null ? `${item.return} USDT` : "--"}
                </div>
                {mainTab === "bets" && (
                  <div style={{ fontSize: "0.85rem", marginTop: "0.3rem" }}>
                    On:{" "}
                    <a
                      href={`#player-${item.player}`}
                      style={{
                        color: "#570064",
                        textDecoration: "underline",
                        cursor: "pointer",
                      }}
                    >
                      {item.player}
                    </a>
                  </div>
                )}
              </div>

              {/* RIGHT: status/result */}
              <div style={{ fontWeight: "bold", textAlign: "right" }}>
                {item.result === "won" && "✅ WON"}
                {item.result === "lost" && "❌ LOST"}
                {item.result === "pending" && "⏳ PENDING"}
              </div>
            </div>
          ))
        ) : (
          <div style={{ textAlign: "center", color: "#57006497" }}>
            No items here.
          </div>
        )}
      </div>

      {/* congrats modal */}
      <CongratulationsModal
        amount={winAmount}
        onClose={() => setWinAmount(null)}
      />

          {/* test button for modal */}
      <button
        onClick={() => setWinAmount(50)}
      style={{
        padding: "12px 30px",
        backgroundColor: "#f5deffff",
        color: "#ffffffff",
        border: "none",
        borderRadius: "50px",
        fontSize:'xx-large',
        width:'100%',
      }}
      >
        Test Popup
      </button>

    </div>
  );
}

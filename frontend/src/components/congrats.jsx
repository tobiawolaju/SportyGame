export default function CongratulationsModal({ amount, onClose }) {
  if (!amount) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backdropFilter: "blur(6px)",
        background: "rgba(255, 255, 255, 0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          background: "linear-gradient(135deg, #e1b7fff1, #ffdc7478)",
          borderRadius: "20px",
          padding: "2rem",
          width: "70%",
          maxWidth: "400px",
          textAlign: "center",
          boxShadow: "0 8px 25px rgba(0,0,0,0.25)",
          color: "#43274a",
          fontFamily: "sans-serif",
          animation: "pop 0.3s ease",
        }}
      >
        <h2 style={{ fontSize: "1.6rem", marginBottom: "0.8rem" }}>
          🎉 Congratulations!
        </h2>
        <p style={{ fontSize: "1.2rem", marginBottom: "1.2rem" }}>
          You have won <span style={{ fontWeight: "bold" }}>{amount} USDT</span>
        </p>
        <button
          onClick={onClose}
          style={{
            padding: "0.6rem 1.5rem",
            border: "none",
            borderRadius: "25px",
            background: "#43274a",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          Close
        </button>
      </div>

      <style>
        {`
          @keyframes pop {
            0% { transform: scale(0.8); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
          }
        `}
      </style>
    </div>
  );
}

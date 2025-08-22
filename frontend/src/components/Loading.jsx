// src/components/Loading.jsx
export default function Loading({ message = "Loading..." }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#fff",
        textAlign: "center",
      }}
    >
      <img
        src="/logo2.png"
        alt="Loading..."
        style={{
          width: "10rem",
          height: "10rem",
          marginBottom: "1rem",
          animation: "fadePulse 2s ease-in-out infinite",
        }}
      />
      <p style={{ fontSize: "1.2rem", color: "#ded2f7ff" }}>{message}</p>
      <style>
        {`@keyframes fadePulse {
            0% { opacity: 0.2; transform: scale(0.95); }
            50% { opacity: 1; transform: scale(1.05); }
            100% { opacity: 0.2; transform: scale(0.95); }
        }`}
      </style>
    </div>
  );
}

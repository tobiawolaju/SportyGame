import React from "react";

export default function ErrorMessage({ message }) {
  return (
    <div
      style={{
        padding: "1rem",
        borderRadius: "12px",
        backgroundColor: "#ffe0e0",
        color: "#a10000",
        textAlign: "center",
        fontWeight: "bold",
      }}
    >
      {message}
    </div>
  );
}

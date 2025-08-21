// server.js
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());

// allow all origins (dev mode)
app.use(cors());
// if you want to restrict, do:
// app.use(cors({ origin: "http://127.0.0.1:5500" }));

const SCRIPT_BASE = "https://script.google.com/macros/s/AKfycbwqvRIHSiAAJGzvsjL8Vt06tcCZWrR0UA23fd34l15qpGrAJ7KLDo_7nKHM1N9Qmfd93A/exec";

// helper
async function proxy(method, query, body = null) {
  const url = `${SCRIPT_BASE}?query=${query}`;
  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : null,
  });
  return res.json();
}

// routes
app.get("/api/matches", async (req, res) => {
  try {
    res.json(await proxy("GET", "matches"));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/matches", async (req, res) => {
  try {
    res.json(await proxy("POST", "matches", req.body));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/users", async (req, res) => {
  try {
    res.json(await proxy("GET", "users"));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/users", async (req, res) => {
  try {
    res.json(await proxy("POST", "users", req.body));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/join", async (req, res) => {
  try {
    res.json(await proxy("POST", "join", req.body));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/checkin", async (req, res) => {
  try {
    res.json(await proxy("POST", "checkin", req.body));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/payment", async (req, res) => {
  try {
    res.json(await proxy("POST", "payment", req.body));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/payout", async (req, res) => {
  try {
    res.json(await proxy("POST", "payout", req.body));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log("backend running on http://localhost:3000"));

const BASE_URL = "http://localhost:3000/api";

async function getAllMatches() {
  const url = `${BASE_URL}/matches`;
  const res = await fetch(url);
  return res.json();
}

async function joinMatch(wallet, matchId) {
  const url = `${BASE_URL}/join`;
  const res = await fetch(url, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ wallet, match_id: matchId })
  });
  return res.json();
}

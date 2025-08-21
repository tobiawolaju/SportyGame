const BASE_URL = "https://script.google.com/macros/s/AKfycbwc3a83MfJncYiD4xUyn_CKTbRTm6RegDjKY84jKgDGuXq4QmCE5pmopV-e0T88OcCdFg/exec";

async function getAllMatches() {
  const url = `${BASE_URL}?query=matches`;
  const res = await fetch(url);
  return res.json();
}

async function joinMatch(wallet, matchId) {
  const url = `${BASE_URL}?query=join`;
  const res = await fetch(url, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ wallet, match_id: matchId })
  });
  return res.json();
}

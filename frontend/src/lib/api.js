const BASE_URL = "https://sportygame.onrender.com/api";

async function request(path, method = "GET", body) {
  const opts = { method, headers: { "Content-Type": "application/json" } };
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(`${BASE_URL}${path}`, opts);
  if (!res.ok) throw new Error(`API ${method} ${path} failed`);
  return res.json();
}

export const api = {
  // matches
  getMatches: () => request("/matches"),
  createMatch: (data) => request("/matches", "POST", data),

  // users
  getUsers: () => request("/users"),
  createUser: (data) => request("/users", "POST", data),

  // entries
  joinMatch: (wallet, matchId) => request("/join", "POST", { wallet, match_id: matchId }),
  checkIn: (wallet, matchId) => request("/checkin", "POST", { wallet, match_id: matchId }),

  // payments
  recordPayment: (data) => request("/payment", "POST", data),
  recordPayout: (data) => request("/payout", "POST", data),
};

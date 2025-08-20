import { API_BASE } from "../../config";

async function request(path: string, options: RequestInit = {}) {
  const res = await fetch(`${API_BASE}?query=${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
  });
  if (!res.ok) throw new Error(res.statusText);
  return res.json();
}

export const SportyAPI = {
  getMatches: () => request("matches"),
  getUsers: () => request("users"),
  joinMatch: (wallet: string, match_id: string) =>
    request("join", {
      method: "POST",
      body: JSON.stringify({ wallet, match_id }),
    }),
  checkin: (wallet: string, match_id: string) =>
    request("checkin", {
      method: "POST",
      body: JSON.stringify({ wallet, match_id }),
    }),
  recordPayment: (p: any) =>
    request("payment", { method: "POST", body: JSON.stringify(p) }),
  recordPayout: (p: any) =>
    request("payout", { method: "POST", body: JSON.stringify(p) }),
};

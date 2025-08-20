// testSportyGame.js
const BASE_URL = "https://script.google.com/macros/s/AKfycbwqvRIHSiAAJGzvsjL8Vt06tcCZWrR0UA23fd34l15qpGrAJ7KLDo_7nKHM1N9Qmfd93A/exec";

// helper wrappers
async function GET(url) {
  const res = await fetch(url);
  return res.json();
}

async function POST(url, data) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

// ----- MATCHES -----
async function getAllMatches() {
  const data = await GET(`${BASE_URL}?query=matches`);
  console.log("All Matches:", data);
}

async function createMatch() {
  const matchData = {
    title: "Duo Scrim #1",
    mode: "duo",
    region: "NA",
    start_time_utc: "2025-09-02T19:00:00Z",
    entry_cap: 50,
    join_deadline_utc: "2025-09-02T18:50:00Z",
    status: "upcoming",
    admin_notes: "invite-only",
    lobby_code: "XYZ999"
  };
  const data = await POST(`${BASE_URL}?query=matches`, matchData);
  console.log("Create Match:", data);
  return data.match_id;
}

// ----- USERS -----
async function getAllUsers() {
  const data = await GET(`${BASE_URL}?query=users`);
  console.log("All Users:", data);
}

async function createUser() {
  const userData = {
    wallet: "0xabc111",
    privy_user_id: "usr_001",
    status: "active",
    pass_expires_at: "2025-09-01T10:00:00Z"
  };
  const data = await POST(`${BASE_URL}?query=users`, userData);
  console.log("Create User:", data);
  return userData.wallet;
}

// ----- ENTRIES -----
async function joinMatch(wallet, matchId) {
  const data = await POST(`${BASE_URL}?query=join`, { wallet, match_id: matchId });
  console.log("Join Match:", data);
  return data.entry_id;
}

async function checkInToMatch(wallet, matchId) {
  const data = await POST(`${BASE_URL}?query=checkin`, { wallet, match_id: matchId });
  console.log("Check-in:", data);
}

// ----- FINANCIALS -----
async function recordPayment(wallet) {
  const paymentData = {
    tx_hash: "0xpay001",
    wallet,
    chain: "base",
    token: "USDC",
    amount: 1,
    block_time: "2025-08-01T10:05:00Z",
    type: "subscription",
    parsed_ok: true,
    notes: "first monthly fee"
  };
  const data = await POST(`${BASE_URL}?query=payment`, paymentData);
  console.log("Record Payment:", data);
}

async function recordPayout(matchId, wallet) {
  const payoutData = {
    match_id: matchId,
    wallet,
    amount: 5,
    tx_hash: "0xpayout111",
    awarded_by: "0xadmin"
  };
  const data = await POST(`${BASE_URL}?query=payout`, payoutData);
  console.log("Record Payout:", data);
}

// ---- TEST RUN SEQUENCE ----
(async () => {
  await getAllMatches();
  const matchId = await createMatch();
  await getAllUsers();
  const wallet = await createUser();
  await joinMatch(wallet, matchId);
  await checkInToMatch(wallet, matchId);
  await recordPayment(wallet);
  await recordPayout(matchId, wallet);
})();

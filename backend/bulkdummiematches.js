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

async function createDummyMatches() {
  const games = ["PUBG", "CODM", "FreeFire"];
  const modes = ["solo", "duo", "squad"];
  const regions = ["NA", "EU", "AS"];
  const startTime = new Date("2025-09-02T19:00:00Z");

  const matchIds = [];

  for (let game of games) {
    for (let mode of modes) {
      for (let region of regions) {
        const matchData = {
          title: `${mode.charAt(0).toUpperCase() + mode.slice(1)} Scrim`,
          game,
          mode,
          region,
          start_time_utc: startTime.toISOString(),
          entry_cap: 50,
          join_deadline_utc: new Date(startTime.getTime() - 10 * 60000).toISOString(),
          status: "upcoming",
          admin_notes: "invite-only",
          lobby_code: `LC${Math.floor(Math.random() * 1000)}`
        };
        const data = await POST(`${BASE_URL}?query=matches`, matchData);
        console.log("Created Match:", data);
        if (data.match_id) matchIds.push(data.match_id);
      }
    }
  }

  return matchIds;
}

// ----- USERS -----
async function getAllUsers() {
  const data = await GET(`${BASE_URL}?query=users`);
  console.log("All Users:", data);
}

async function createUser(index = 1) {
  const wallet = `0xuser${index.toString().padStart(3, "0")}`;
  const userData = {
    wallet,
    privy_user_id: `usr_${index.toString().padStart(3, "0")}`,
    status: "active",
    pass_expires_at: "2025-09-01T10:00:00Z"
  };
  const data = await POST(`${BASE_URL}?query=users`, userData);
  console.log("Created User:", data);
  return wallet;
}

// ----- ENTRIES -----
async function joinMatch(wallet, matchId) {
  const data = await POST(`${BASE_URL}?query=join`, { wallet, match_id: matchId });
  console.log("Joined Match:", data);
  return data.entry_id;
}

async function checkInToMatch(wallet, matchId) {
  const data = await POST(`${BASE_URL}?query=checkin`, { wallet, match_id: matchId });
  console.log("Checked-in:", data);
}

// ----- FINANCIALS -----
async function recordPayment(wallet) {
  const paymentData = {
    tx_hash: `0xpay${Math.floor(Math.random() * 10000)}`,
    wallet,
    chain: "base",
    token: "USDC",
    amount: 1,
    block_time: new Date().toISOString(),
    type: "subscription",
    parsed_ok: true,
    notes: "first monthly fee"
  };
  const data = await POST(`${BASE_URL}?query=payment`, paymentData);
  console.log("Recorded Payment:", data);
}

async function recordPayout(matchId, wallet) {
  const payoutData = {
    match_id: matchId,
    wallet,
    amount: 5,
    tx_hash: `0xpayout${Math.floor(Math.random() * 10000)}`,
    awarded_by: "0xadmin"
  };
  const data = await POST(`${BASE_URL}?query=payout`, payoutData);
  console.log("Recorded Payout:", data);
}

// ---- TEST RUN SEQUENCE ----
(async () => {
  await getAllMatches();
  const matchIds = await createDummyMatches(); // generate all dummy matches
  await getAllUsers();

  const wallets = [];
  for (let i = 1; i <= 3; i++) { // create 3 dummy users
    const wallet = await createUser(i);
    wallets.push(wallet);
    await recordPayment(wallet);
  }

  // auto join and check-in all users to all matches
  for (let matchId of matchIds) {
    for (let wallet of wallets) {
      await joinMatch(wallet, matchId);
      await checkInToMatch(wallet, matchId);
      await recordPayout(matchId, wallet);
    }
  }
})();

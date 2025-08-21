async function renderMatches() {
  const container = document.getElementById("matches");
  container.innerHTML = "Loading...";

  try {
    const matches = await getAllMatches();
    container.innerHTML = "";

    matches.forEach(match => {
      const div = document.createElement("div");
      div.className = "match";

      div.innerHTML = `
        <h3>${match.title}</h3>
        <p>Game: ${match.game || "PUBG"} | Mode: ${match.mode} | Region: ${match.region}</p>
        <p>Starts: ${new Date(match.start_time_utc).toLocaleString()}</p>
        <p>Status: ${match.status}</p>
        <button class="join-btn" data-id="${match.match_id}">Join Match</button>
      `;

      container.appendChild(div);
    });

    document.querySelectorAll(".join-btn").forEach(btn => {
      btn.addEventListener("click", async (e) => {
        const matchId = e.target.dataset.id;
        const wallet = "0xtestwallet"; // placeholder
        const res = await joinMatch(wallet, matchId);
        alert(JSON.stringify(res));
      });
    });

  } catch (err) {
    container.innerHTML = "Error loading matches.";
    console.error(err);
  }
}

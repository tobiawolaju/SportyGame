import { useEffect, useState } from "react";
import { api } from "../lib/api";
import Loading from "../components/Loading";

export default function Admin({ user }) {
  const [users, setUsers] = useState(null);
  const [matches, setMatches] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const [u, m] = await Promise.all([api.getUsers(), api.getMatches()]);
      setUsers(u);
      setMatches(m);
    }
    fetchData();
  }, []);

  // form state
  const [form, setForm] = useState({
    title: "",
    mode: "solo",
    region: "NA",
    start_time_utc: "",
    entry_cap: 50,
    join_deadline_utc: "",
    lobby_code: "",
    admin_notes: ""
  });

  function updateForm(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function createMatch(e) {
    e.preventDefault();
    const res = await api.createMatch({
      ...form,
      status: "upcoming"
    });
    alert("created match " + res.match_id);
    setMatches([...matches, res]); // optimistic
  }

  if (users === null || matches === null) {
    return <Loading message="Loading admin data..." />;
  }

  const totalUsers = users.length;
  const totalMatches = matches.length;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Admin dashboard</h2>

      {/* stats */}
      <div style={{ display: "flex", gap: "2rem", marginBottom: "2rem" }}>
        <div>Total Users: {totalUsers}</div>
        <div>Total Matches: {totalMatches}</div>
      </div>

      {/* match creator */}
      <form onSubmit={createMatch} style={{ marginBottom: "2rem" }}>
        <h3>Create Match</h3>
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={updateForm}
        />
        <select name="mode" value={form.mode} onChange={updateForm}>
          <option value="solo">Solo</option>
          <option value="duo">Duo</option>
          <option value="squad">Squad</option>
        </select>
        <input
          name="region"
          placeholder="Region"
          value={form.region}
          onChange={updateForm}
        />
        <input
          type="datetime-local"
          name="start_time_utc"
          value={form.start_time_utc}
          onChange={updateForm}
        />
        <input
          type="number"
          name="entry_cap"
          value={form.entry_cap}
          onChange={updateForm}
        />
        <input
          type="datetime-local"
          name="join_deadline_utc"
          value={form.join_deadline_utc}
          onChange={updateForm}
        />
        <input
          name="lobby_code"
          placeholder="Lobby Code"
          value={form.lobby_code}
          onChange={updateForm}
        />
        <input
          name="admin_notes"
          placeholder="Admin Notes"
          value={form.admin_notes}
          onChange={updateForm}
        />
        <button type="submit">+ Create Match</button>
      </form>

      {/* users list */}
      <h3>Users</h3>
      {users.length === 0 ? (
        <p>No users yet</p>
      ) : (
        <ul>
          {users.map(u => (
            <li key={u.wallet}>
              {u.wallet} | {u.status} | pass expires {u.pass_expires_at}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

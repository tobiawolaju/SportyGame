import { Routes, Route, Navigate } from "react-router-dom";
import { usePrivy } from "@privy-io/react-auth";

import Header from "./components/Header";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Profile from "./pages/Profile";
import Leaderboard from "./pages/Leaderboard";


import Admin from "./pages/Admin";


const ADMINS = [
  "0x1aac3dfa0aaecdae99697823f400e79902468b13",
  "0xdef222"
];


function App() {
  const { ready, authenticated, user } = usePrivy();
  if (!ready) return null;

  const wallet = user?.wallet?.address?.toLowerCase();
  const isAdmin = ADMINS.includes(wallet);

  return (
    <div className="App" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />

      <main style={{ flex: 1, paddingTop: "4rem" }}>
        <Routes>
          {!authenticated && <Route path="*" element={<Landing />} />}
          {authenticated && (
            <>
              <Route path="/" element={<Home user={user} />} />
              <Route path="/profile" element={<Profile />} />
                    <Route path="/leaderboard" element={<Leaderboard />} />
              {isAdmin && <Route path="/admin" element={<Admin user={user} />} />}
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}
        </Routes>
      </main>
    </div>
  );
}

export default App;

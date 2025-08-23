import { Routes, Route, Navigate } from "react-router-dom";
import { usePrivy } from "@privy-io/react-auth";

import Header from "./components/Header";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Profile from "./pages/Profile";
import Leaderboard from "./pages/Leaderboard";
import Admin from "./pages/Admin";


const ADMINS = [
  "tobiawolaju21@gmail.com",
  "ibkacc1@gmail.com"
];



function App() {
  const { ready, authenticated, user } = usePrivy();
  if (!ready) return null;
 
  const email = user?.google?.email.toLowerCase();
  const isAdmin = ADMINS.includes(email);

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

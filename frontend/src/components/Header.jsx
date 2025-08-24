import { NavLink } from "react-router-dom";
import { usePrivy } from "@privy-io/react-auth";
import { Gamepad2, Trophy, User, Shield } from "lucide-react"; 

const ADMINS = [
  "tobiawolaju21@gmail.com",
  "ibkacc1@gmail.com"
];

export default function Layout() {
  const { authenticated, user } = usePrivy();
  const email = user?.google?.email.toLowerCase();
  const isAdmin = ADMINS.includes(email);

  const baseStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontSize: "0.75rem",
    textDecoration: "none",
    color: "#a9a9a9",
  };

  return (
    <div>
      {/* header */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "3.5rem",
          display: "flex",
          alignItems: "center",
          padding: "0 1.5rem",
          background: "#d8a8ff",
          color: "#000",
          boxShadow: "0 2px 4px rgba(0,0,0,0.06)",
          zIndex: 1000,
        }}
      >
        <h3 style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <img
            src="/logo1.png"
            alt="SportyGames"
            style={{ width: "40px", height: "40px" }}
          />
          SportyGames
        </h3>
      </header>

      {/* footer nav bar - only visible if authenticated */}
      {authenticated && (
        <footer
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            height: "3.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "2rem",
            background: "#fff",
            color: "#a9a9a9",
            boxShadow: "0 -2px 4px rgba(0,0,0,0.06)",
            zIndex: 1000,
          }}
        >
          <nav style={{ display: "flex", gap: "5rem" }}>
            <NavLink
              to="/"
              style={({ isActive }) => ({
                ...baseStyle,
                color: isActive ? "#000" : "#a9a9a9",
              })}
            >
              {({ isActive }) => (
                <>
                  <Gamepad2
                    size={25}
                    strokeWidth={isActive ? 3 : 2}
                    color={isActive ? "black" : "#a9a9a9"}
                  />
                  <span>Sports</span>
                </>
              )}
            </NavLink>

            <NavLink
              to="/leaderboard"
              style={({ isActive }) => ({
                ...baseStyle,
                color: isActive ? "#000" : "#a9a9a9",
              })}
            >
              {({ isActive }) => (
                <>
                  <Trophy
                    size={25}
                    strokeWidth={isActive ? 3 : 2}
                    color={isActive ? "black" : "#a9a9a9"}
                  />
                  <span>Open Bets</span>
                </>
              )}
            </NavLink>

            <NavLink
              to="/profile"
              style={({ isActive }) => ({
                ...baseStyle,
                color: isActive ? "#000" : "#a9a9a9",
              })}
            >
              {({ isActive }) => (
                <>
                  <User
                    size={25}
                    strokeWidth={isActive ? 3 : 2}
                    color={isActive ? "black" : "#a9a9a9"}
                  />
                  <span>Me</span>
                </>
              )}
            </NavLink>

            {isAdmin && (
              <NavLink
                to="/admin"
                style={({ isActive }) => ({
                  ...baseStyle,
                  color: isActive ? "#000" : "#a9a9a9",
                })}
              >
                {({ isActive }) => (
                  <>
                    <Shield
                      size={25}
                      strokeWidth={isActive ? 3 : 2}
                      color={isActive ? "black" : "#a9a9a9"}
                    />
                    <span>Admin</span>
                  </>
                )}
              </NavLink>
            )}
          </nav>
        </footer>
      )}
    </div>
  );
}

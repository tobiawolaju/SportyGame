import { useAuth } from "../hooks/useAuth";

export default function TopBar() {
  const { ready, authenticated, login, logout, wallet } = useAuth();

  return (
    <div className="w-full flex items-center justify-between bg-gray-900 text-white px-4 py-2">
      <h1 className="text-xl font-bold">SportyGame</h1>
      {ready ? (
        authenticated ? (
          <div className="flex items-center gap-3">
            <span className="text-sm">{wallet?.slice(0, 6)}…{wallet?.slice(-4)}</span>
            <button
              className="bg-red-500 px-3 py-1 rounded"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            className="bg-green-500 px-3 py-1 rounded"
            onClick={login}
          >
            Login with Privy
          </button>
        )
      ) : (
        <span>Loading…</span>
      )}
    </div>
  );
}

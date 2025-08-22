import { usePrivy } from "@privy-io/react-auth";

export default function LogoutButton() {
  const { logout } = usePrivy();

  return (
    <button
      data-testid="logout-button"
      onClick={logout}
   style={{
        padding: "12px 30px",
        backgroundColor: "#f7e4ffff",
        color: "#000000ff",
        border: "none",
        borderRadius: "10px",
      }}
    >
      Logout
    </button>
  );
}









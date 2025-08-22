import { usePrivy } from "@privy-io/react-auth";

export default function LoginButton() {
  const { login } = usePrivy();

  return (
    <button
      onClick={login}
      style={{
        padding: "12px 30px",
        backgroundColor: "#e3a0ffff",
        color: "#000000ff",
        border: "none",
        borderRadius: "50px",
        fontSize:'xx-large'
      }}
    >
      Get started
    </button>
  );
}

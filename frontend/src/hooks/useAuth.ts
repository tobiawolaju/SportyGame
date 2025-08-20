import { usePrivy } from "@privy-io/react-auth";

export function useAuth() {
  const { ready, authenticated, login, logout, user } = usePrivy();

  const wallet = user?.wallet?.address ?? null;

  return { ready, authenticated, login, logout, wallet };
}

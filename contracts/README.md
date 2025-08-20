Chain: Base or Polygon (cheap gas). Token: USDC.

function buyOrExtend(uint256 months) pulls USDC via transferFrom to treasury; records expiresAt[wallet] += months*30d (cap with max(now, expires)).

event SubscriptionPurchased(address wallet, uint256 months, uint256 newExpiry)

no custodial prize logic in v1. keep contract tiny.

UX note: users must approve USDC once, then call buyOrExtend. Do it via  user’s own wallet connceted to Privy.
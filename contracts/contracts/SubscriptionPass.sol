// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

/**
 * @title SubscriptionPass
 * @author Tobi's Architect
 * @notice A minimal, non-custodial contract for managing monthly subscriptions via USDC.
 * Users pay a fixed monthly fee, which is transferred directly to a treasury wallet.
 * The contract tracks the subscription expiry for each user.
 */
contract SubscriptionPass {
    using SafeERC20 for IERC20;

    // --- Events ---

    event SubscriptionPurchased(
        address indexed wallet,
        uint256 months,
        uint256 newExpiryTimestamp
    );

    // --- State Variables ---

    IERC20 public immutable usdcToken;
    address public immutable treasury;
    uint256 public immutable monthlyPrice; // Price in USDC smallest unit (e.g., 6 decimals for USDC)

    mapping(address => uint256) public expiresAt;

    // --- Constants ---

    uint256 private constant THIRTY_DAYS = 30 days;

    // --- Constructor ---

    /**
     * @param _usdcToken The address of the USDC ERC20 token contract.
     * @param _treasury The address where subscription fees will be sent.
     * @param _monthlyPrice The price for a 30-day subscription period in the smallest unit of USDC.
     */
    constructor(address _usdcToken, address _treasury, uint256 _monthlyPrice) {
        require(_usdcToken != address(0), "SubscriptionPass: USDC token cannot be zero address");
        require(_treasury != address(0), "SubscriptionPass: Treasury cannot be zero address");
        require(_monthlyPrice > 0, "SubscriptionPass: Monthly price must be greater than zero");

        usdcToken = IERC20(_usdcToken);
        treasury = _treasury;
        monthlyPrice = _monthlyPrice;
    }

    // --- External Functions ---

    /**
     * @notice Allows a user to purchase or extend their subscription for a given number of months.
     * The user must have first approved the contract to spend the required USDC amount.
     * @param _months The number of 30-day periods to purchase.
     */
    function buyOrExtend(uint256 _months) external {
        require(_months > 0, "SubscriptionPass: Must purchase at least one month");

        uint256 totalPrice = _months * monthlyPrice;

        // Pull the total subscription fee from the user to the treasury.
        usdcToken.safeTransferFrom(msg.sender, treasury, totalPrice);

        // Calculate the new expiry date. If the current subscription is expired,
        // the new period starts from the current block time. Otherwise, it extends
        // the existing expiry date.
        uint256 currentExpiry = expiresAt[msg.sender];
        uint256 fromTimestamp = block.timestamp > currentExpiry ? block.timestamp : currentExpiry;
        uint256 newExpiry = fromTimestamp + (_months * THIRTY_DAYS);

        expiresAt[msg.sender] = newExpiry;

        emit SubscriptionPurchased(msg.sender, _months, newExpiry);
    }

    // --- View Functions ---

    /**
     * @notice Checks if a user's subscription is currently active.
     * @param _user The address of the user to check.
     * @return bool True if the subscription is active, false otherwise.
     */
    function isActive(address _user) external view returns (bool) {
        return expiresAt[_user] >= block.timestamp;
    }
}

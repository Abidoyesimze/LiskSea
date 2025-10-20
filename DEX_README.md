# 💱 Simple DEX Implementation

This implementation provides a complete decentralized exchange (DEX) built on the Lisk network using automated market maker (AMM) principles.

## 🏗️ Architecture

### Smart Contracts

1. **SimpleUSDC.sol** - A mock stablecoin with 6 decimals (like real USDC)
2. **MyToken.sol** - A standard ERC20 token with 18 decimals
3. **SimpleDEX.sol** - The main DEX contract implementing AMM functionality

### Frontend Components

1. **DEX Page** (`/dex`) - Main interface with tab navigation
2. **SwapPanel** - Token swapping interface with real-time quotes
3. **LiquidityPanel** - Add/remove liquidity functionality

## 🚀 Features

### Swap Functionality
- Real-time price quotes using `getSwapAmount()` view function
- 0.3% trading fee (collected as liquidity)
- Support for both token directions (MTK ↔ sUSDC)
- Automatic approval handling
- Balance display and validation

### Liquidity Management
- Add liquidity by providing both tokens
- Remove liquidity by burning LP tokens
- Real-time pool statistics
- User share calculation
- Proportional token returns

### Security Features
- ReentrancyGuard protection
- Input validation and bounds checking
- Immutable token addresses
- Proper event emissions

## 📊 How It Works

### Constant Product AMM Formula
The DEX uses the constant product formula: `x * y = k`

- `x` = Reserve of token A
- `y` = Reserve of token B  
- `k` = Constant (increases with fees)

### Swap Calculation
```
amountOut = (amountIn * 0.997 * reserveOut) / (reserveIn + amountIn * 0.997)
```

The 0.997 factor represents the 0.3% fee (997/1000).

### Liquidity Provision
- **First LP**: `liquidityMinted = amountA`
- **Subsequent LPs**: Maintains pool ratio to prevent manipulation

## 🛠️ Setup & Deployment

### Prerequisites
- Node.js (>= v18.17)
- Yarn package manager
- Git

### Local Development

1. **Start the local chain:**
   ```bash
   yarn chain
   ```

2. **Deploy contracts:**
   ```bash
   yarn deploy
   ```

3. **Start the frontend:**
   ```bash
   yarn start
   ```

4. **Open http://localhost:3000/dex**

### Deploy to Lisk Sepolia

1. **Deploy contracts:**
   ```bash
   yarn deploy --network liskSepolia
   ```

2. **Verify contracts on Blockscout:**
   ```bash
   yarn hardhat-verify --network liskSepolia --contract contracts/SimpleUSDC.sol:SimpleUSDC YOUR_USDC_ADDRESS
   yarn hardhat-verify --network liskSepolia --contract contracts/SimpleDEX.sol:SimpleDEX YOUR_DEX_ADDRESS
   ```

## 💡 Usage Guide

### Adding Initial Liquidity

1. Navigate to the DEX page
2. Switch to the "Liquidity" tab
3. Enter amounts for both tokens (maintaining pool ratio)
4. Approve both tokens if needed
5. Click "Add Liquidity"

### Swapping Tokens

1. Navigate to the DEX page
2. Stay on the "Swap" tab
3. Enter the amount you want to swap
4. Check the output amount and exchange rate
5. Approve the input token if needed
6. Click "Swap"

### Removing Liquidity

1. Navigate to the "Liquidity" tab
2. Enter the amount of LP tokens to burn
3. Review the expected token returns
4. Click "Remove Liquidity"

## 🔍 Contract Functions

### SimpleDEX Functions

#### Core Functions
- `addLiquidity(uint256 amountA, uint256 amountB)` - Add liquidity to the pool
- `removeLiquidity(uint256 liquidityAmount)` - Remove liquidity from the pool
- `swap(address tokenIn, uint256 amountIn)` - Swap tokens

#### View Functions
- `getSwapAmount(address tokenIn, uint256 amountIn)` - Get swap quote
- `getReserves()` - Get current pool reserves
- `getUserLiquidity(address user)` - Get user's liquidity position

#### State Variables
- `tokenA`, `tokenB` - Token addresses (immutable)
- `reserveA`, `reserveB` - Current pool reserves
- `totalLiquidity` - Total LP tokens in circulation
- `liquidity[address]` - LP tokens per user

## 🎯 Key Features Explained

### Decimal Handling
- **MyToken**: 18 decimals (standard ERC20)
- **SimpleUSDC**: 6 decimals (matches real USDC)
- Frontend automatically handles decimal conversion

### Fee Structure
- 0.3% trading fee on all swaps
- Fees stay in the pool, increasing value for all LPs
- No fees on liquidity operations

### Price Discovery
- Prices are determined by the constant product formula
- Larger trades experience more slippage
- Real-time quotes prevent front-running

## 🚨 Security Considerations

### For Production Use
- Remove public `mint()` functions from tokens
- Implement proper access controls
- Add emergency pause functionality
- Conduct thorough security audits
- Implement proper fee collection mechanisms

### Current Implementation
- Public minting for testing purposes only
- Basic validation and error handling
- ReentrancyGuard protection
- Immutable token addresses

## 📈 Example Scenarios

### Scenario 1: First Liquidity Provider
1. Pool is empty (0 reserves)
2. User adds 100 MTK + 200 sUSDC
3. Receives 100 LP tokens
4. Pool ratio: 1 MTK = 2 sUSDC

### Scenario 2: Token Swap
1. Pool has 100 MTK + 200 sUSDC
2. User swaps 10 MTK
3. Receives ~19.8 sUSDC (after 0.3% fee)
4. New pool: 110 MTK + 180.2 sUSDC

### Scenario 3: Second Liquidity Provider
1. Pool has 100 MTK + 200 sUSDC
2. User wants to add 20 MTK + 40 sUSDC
3. Maintains 1:2 ratio
4. Receives 20 LP tokens (proportional to input)

## 🔧 Troubleshooting

### Common Issues

1. **"Insufficient allowance"**
   - Approve the DEX contract to spend your tokens
   - Check token addresses are correct

2. **"Insufficient balance"**
   - Mint more tokens for testing
   - Check you have enough of both tokens for liquidity

3. **"Insufficient liquidity"**
   - Add liquidity to the pool first
   - Check pool has reserves for swaps

4. **"Invalid token"**
   - Ensure you're using the correct token addresses
   - Check the DEX is deployed with the right token pair

## 📚 Further Reading

- [Uniswap V2 Documentation](https://docs.uniswap.org/contracts/v2/overview)
- [Automated Market Maker (AMM) Concepts](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/)
- [Lisk Network Documentation](https://lisk.com/documentation)

## 🎉 Congratulations!

You've successfully implemented a fully functional DEX with:
- ✅ Token swapping with real-time quotes
- ✅ Liquidity provision and management
- ✅ Automated market maker pricing
- ✅ Beautiful, responsive UI
- ✅ Proper error handling and validation
- ✅ Security best practices

This DEX can handle real trading scenarios and serves as an excellent foundation for more advanced DeFi applications!

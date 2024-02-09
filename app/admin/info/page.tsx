import React from 'react'

const page = () => {
  return (
    <div>
     
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Overview Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Overview:</h2>
        <p className="text-gray-400 font-semibold">
          The DDI (Digital Dutch Invest) smart contract is an ERC20-compliant token that allows users to deposit stablecoins (USDC or USDT) and receive DDI tokens in return. It supports functionalities such as depositing, withdrawing, burning.
        </p>
      </section>

      {/* Key Features Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Key Features:</h2>
        <ul className="list-disc list-inside text-gray-400 font-semibold">
          <li>Supports ERC20, ERC20Burnable, ERC20Pausable, Ownable, ERC20Permit, and ReentrancyGuard interfaces.</li>
          <li>Allows users to deposit stablecoins (USDC or USDT) and receive DDI tokens based on a multiplier.</li>
          <li>Implements pause and unpause functionality to control token transfers.</li>
          <li>Provides methods to set parameters such as minimum deposit amount, DDI multiplier, and treasury wallet address.</li>
          <li>Tracks user statistics including total deposits and withdrawals.</li>
          <li>Implements burning functionality for DDI tokens.</li>
          <li>Supports emergency withdrawals of tokens.</li>
        </ul>
      </section>

      {/* Contract Functions Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Contract Functions:</h2>
        <ul className="list-disc list-inside text-gray-400 font-semibold">
          <li>pause(): Pauses token transfers, accessible only by the contract owner.</li>
          <li>unpause(): Unpauses token transfers, accessible only by the contract owner.</li>
          <li>setMinDepositAmount(uint256 _usdAmount): Sets the minimum deposit amount required, accessible only by the contract owner.</li>
          <li>setDDIMultiplier(uint256 _ddiMultiplier): Sets the multiplier used to calculate DDI tokens per USD, accessible only by the contract owner.</li>
          <li>setTreasuryWallet(address _treasuryWallet): Sets the treasury wallet address, accessible only by the contract owner.</li>
          <li>setStableCoins(address _coin1, address _coin2): Sets the addresses of USDC and USDT tokens, accessible only by the contract owner.</li>
          <li>deposit(uint256 _usdAmount, bool isUsdc): Allows users to deposit stablecoins and receive DDI tokens.</li>
          <li>withdraw(uint256 _amount): Allows users to withdraw DDI tokens by burning them.</li>
          <li>burn(uint256 _amount): Burns DDI tokens, accessible only by the token owner.</li>
          <li>mint(address to, uint256 amount): Mints new DDI tokens, accessible only by the contract owner.</li>
          <li>emergencyWithdraw(IERC20 token, address to, uint256 amount): Allows the contract owner to withdraw tokens in case of emergencies.</li>
        </ul>
      </section>

      {/* Usage Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Usage:</h2>
        <p className="text-gray-400 font-semibold">
          Users can deposit stablecoins (USDC or USDT) into the contract using the deposit function. Upon deposit, users receive DDI tokens based on the specified multiplier. Users can withdraw DDI tokens using the withdraw function, burning the tokens. The contract owner can manage parameters and perform emergency withdrawals as needed.
        </p>
      </section>
    </div>
    </div>
  )
}

export default page

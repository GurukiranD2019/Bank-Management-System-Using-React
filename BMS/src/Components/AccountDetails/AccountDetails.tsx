import React, { useState, useEffect } from "react";
import "./AccountDetails.css";

interface AccountDetailsProps {
  userDetails: {
    accountBalance: string;
    accountType: string;
    accountNumber: string;
    branchName: string;
  };
  onBack: () => void;
}

interface Transaction {
  date: string;
  amount: number;
  type: "CR" | "DR"; // CR for credit, DR for debit
}

const AccountDetails: React.FC<AccountDetailsProps> = ({
  userDetails,
  onBack,
}) => {
  const [balance, setBalance] = useState<number>(
    parseFloat(userDetails.accountBalance)
  );
  const [amount, setAmount] = useState<string>("");
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Update the balance in real-time whenever a transaction occurs
  useEffect(() => {
    console.log("Balance updated:", balance);
  }, [balance]);

  const handleDeposit = () => {
    const depositAmount = parseFloat(amount);
    if (depositAmount >= 500) {
      setBalance((prevBalance) => prevBalance + depositAmount);
      setTransactions((prevTransactions) => [
        ...prevTransactions,
        {
          date: new Date().toLocaleString(),
          amount: depositAmount,
          type: "CR",
        },
      ]);
      setAmount("");
    } else {
      alert("Minimum deposit amount is 500.");
    }
  };

  const handleDraw = () => {
    const drawAmount = parseFloat(amount);
    if (drawAmount > balance) {
      alert("Insufficient balance.");
    } else if (drawAmount >= 500) {
      setBalance((prevBalance) => prevBalance - drawAmount);
      setTransactions((prevTransactions) => [
        ...prevTransactions,
        {
          date: new Date().toLocaleString(),
          amount: drawAmount,
          type: "DR",
        },
      ]);
      setAmount("");
    } else {
      alert("Minimum draw amount is 500.");
    }
  };

  return (
    <div className="account-details-container">
      <div className="account-card">
        <h2 className="account-title">My Account</h2>
        <div className="account-info">
          <p>
            <strong>Account Balance:</strong> {userDetails.accountBalance}
          </p>
          <p>
            <strong>Account Type:</strong> {userDetails.accountType}
          </p>
          <p>
            <strong>Account Number:</strong> {userDetails.accountNumber}
          </p>
          <p>
            <strong>Branch Name:</strong> {userDetails.branchName}
          </p>
        </div>

        <div className="transaction-form">
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button className="deposit-button" onClick={handleDeposit}>
            Deposit
          </button>
          <button className="draw-button" onClick={handleDraw}>
            Draw
          </button>
        </div>

        <div className="account-buttons">
          <button className="back-button" onClick={onBack}>
            Back
          </button>
        </div>
      </div>

      <div className="account-statement">
        <h3>Account Statement</h3>
        {transactions.length === 0 ? (
          <p>No transactions yet.</p>
        ) : (
          <ul>
            {transactions.map((transaction, index) => (
              <li
                key={index}
                className={transaction.type === "CR" ? "credit" : "debit"}
              >
                {transaction.date} - {transaction.type === "CR" ? "+" : "-"}$
                {transaction.amount.toFixed(2)} {transaction.type}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AccountDetails;

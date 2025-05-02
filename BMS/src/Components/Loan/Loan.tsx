import React, { useState } from "react";
import "./Loan.css";

interface LoanProps {
  onBack: () => void; // Function to handle back navigation
}

const Loan: React.FC<LoanProps> = ({ onBack }) => {
  const [loanType, setLoanType] = useState<string>("");
  const [interestRate, setInterestRate] = useState<number>(0);
  const [principal, setPrincipal] = useState<string>("");
  const [tenure, setTenure] = useState<string>("");
  const [summary, setSummary] = useState<{
    emi: number;
    totalInterest: number;
    totalAmount: number;
  } | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleLoanTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLoanType = e.target.value;
    setLoanType(selectedLoanType);

    // Set interest rate based on loan type
    if (selectedLoanType === "Education Loan") {
      setInterestRate(9);
    } else if (selectedLoanType === "Personal/Home Loan") {
      setInterestRate(12);
    } else {
      setInterestRate(0);
    }
  };

  const calculateEMI = () => {
    const principalAmount = parseFloat(principal);
    const loanTenure = parseInt(tenure);
    const monthlyRate = interestRate / 12 / 100;

    // EMI formula: [P x R x (1+R)^N] / [(1+R)^N - 1]
    const emi =
      (principalAmount *
        monthlyRate *
        Math.pow(1 + monthlyRate, loanTenure * 12)) /
      (Math.pow(1 + monthlyRate, loanTenure * 12) - 1);

    const totalAmount = emi * loanTenure * 12;
    const totalInterest = totalAmount - principalAmount;

    setSummary({
      emi: parseFloat(emi.toFixed(2)),
      totalInterest: parseFloat(totalInterest.toFixed(2)),
      totalAmount: parseFloat(totalAmount.toFixed(2)),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculateEMI();
  };

  const handleLoanApplicationSubmit = () => {
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="loan-container">
        <h2>Loan Application Submitted</h2>
        <p>
          Loan application submitted for verification. Please reach out to the
          bank to know more.
        </p>
        <button onClick={onBack} className="back-button">
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="loan-container">
      <h2>Apply for Loan</h2>
      <form onSubmit={handleSubmit} className="loan-form">
        <div className="form-group">
          <label htmlFor="loanType">Loan Type:</label>
          <select
            id="loanType"
            value={loanType}
            onChange={handleLoanTypeChange}
            required
          >
            <option value="">Select Loan Type</option>
            <option value="Education Loan">Education Loan</option>
            <option value="Personal/Home Loan">Personal/Home Loan</option>
          </select>
        </div>

        {loanType && (
          <>
            <div className="form-group">
              <label htmlFor="interestRate">Rate of Interest:</label>
              <input
                type="text"
                id="interestRate"
                value={`${interestRate}%`}
                readOnly
              />
            </div>

            <div className="form-group">
              <label htmlFor="principal">Principal Amount:</label>
              <input
                type="number"
                id="principal"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
                placeholder="Enter principal amount"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="tenure">Loan Tenure (in years):</label>
              <input
                type="number"
                id="tenure"
                value={tenure}
                onChange={(e) => setTenure(e.target.value)}
                placeholder="Enter loan tenure"
                required
              />
            </div>

            <button type="submit" className="calculate-button">
              Calculate EMI
            </button>
          </>
        )}
      </form>

      {summary && (
        <div className="loan-summary">
          <h3>Loan Summary</h3>
          <p>
            <strong>Monthly EMI:</strong> {summary.emi}/-
          </p>
          <p>
            <strong>Total Interest:</strong> {summary.totalInterest} /-
          </p>
          <p>
            <strong>Total Amount (Principal + Interest):</strong>
            {summary.totalAmount} /-
          </p>
          <button
            className="submit-loan-button"
            onClick={handleLoanApplicationSubmit}
          >
            Submit Loan Application
          </button>
        </div>
      )}

      <button onClick={onBack} className="back-button">
        Back to Home
      </button>
    </div>
  );
};

export default Loan;

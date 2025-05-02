import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Home.css";
import AccountDetails from "./AccountDetails/AccountDetails";
import Profile from "./Profile/Profile";
import Loan from "./Loan/Loan"; // Import the Loan component

const Home: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<
    "account" | "profile" | "loan" | null
  >(null);
  const userDetails = location.state?.user;

  const handleLogout = () => {
    navigate("/");
  };

  const handleProfile = () => {
    setActiveSection("profile");
  };

  const handleLoanApplication = () => {
    setActiveSection("loan");
  };

  return (
    <div>
      <header className="header">
        <h1>Bank Management System</h1>

        <div className="header-buttons">
          <button className="profile-button" onClick={handleProfile}>
            My Profile
          </button>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      {activeSection === null && (
        <div className="home-content">
          <div className="logged-in">
            <p>You have successfully logged in.</p>
          </div>
          <h2>Welcome to the Bank Management System</h2>

          <p className="description">
            The Bank Management System is a comprehensive platform designed to
            provide users with seamless access to various banking services.
            Whether you want to manage your account, apply for loans, or explore
            other financial services, this system offers a user-friendly
            interface and robust functionality to meet your needs. Explore our
            services to manage your account, apply for loans, and access other
            banking features. Use the buttons below to navigate to your account
            details or start a loan application.
          </p>
          <p className="description">
            Here are some of the loan options you can apply for
          </p>
          <p className="description">
            <strong>Education Loan:</strong> Designed to support students in
            pursuing higher education. Offers a competitive interest rate of 9%.
            Flexible repayment options tailored for students.
          </p>
          <p className="description">
            <strong>Personal/Home Loan:</strong> Ideal for personal expenses or
            purchasing a home. Comes with an interest rate of 12%. Suitable for
            short-term or long-term financial needs.
          </p>
          <p className="description">
            <strong>Loan Tenure:</strong> Loan tenure can be customized based on
            your requirements. Choose a tenure that fits your financial
            planning.
          </p>
          <p className="description">
            <strong>EMI Calculation:</strong> Use our EMI calculator to estimate
            your monthly payments. Get a clear understanding of the total
            interest and repayment amount.
          </p>
          <p className="description">
            <strong>Application Process</strong> Select the loan type and
            provide the required details. Submit your application for
            verification. Visit the bank for further assistance.
          </p>
          <div className="home-buttons">
            <button
              className="action-button"
              onClick={() => setActiveSection("account")}
            >
              My Account
            </button>
            <button className="action-button" onClick={handleLoanApplication}>
              Apply for Loan
            </button>
          </div>
        </div>
      )}

      {activeSection === "account" && (
        <AccountDetails
          userDetails={userDetails}
          onBack={() => setActiveSection(null)}
        />
      )}

      {activeSection === "profile" && (
        <Profile
          userDetails={userDetails}
          onBack={() => setActiveSection(null)} // Pass onBack function
        />
      )}

      {activeSection === "loan" && (
        <Loan onBack={() => setActiveSection(null)} /> // Use the Loan component
      )}
    </div>
  );
};

export default Home;

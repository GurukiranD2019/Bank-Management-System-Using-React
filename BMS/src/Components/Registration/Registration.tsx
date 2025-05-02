import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Registration.css";

interface User {
  name: string;
  username: string;
  password: string;
  address: string;
  country: string;
  state: string;
  email: string;
  contact: string;
  dob: string;
  accountType: string;
  branchName: string;
  initialDeposit: string;
  idProofType: string;
  idDocumentNo: string;
  accountNumber: string;
  ageCategory: string;
}

const Registration: React.FC = () => {
  const [formData, setFormData] = useState<User>({
    name: "",
    username: "",
    password: "",
    address: "",
    country: "",
    state: "",
    email: "",
    contact: "",
    dob: "",
    accountType: "",
    branchName: "",
    initialDeposit: "",
    idProofType: "",
    idDocumentNo: "",
    accountNumber: "",
    ageCategory: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const calculateAgeCategory = (dob: string): string => {
    const birthDate = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      return (age - 1).toString();
    }

    if (age < 18) return "Minor";
    if (age >= 18 && age <= 60) return "Normal";
    return "Senior";
  };

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "name":
        if (!/^[A-Za-z\s]+$/.test(value)) {
          return "Name should contain only alphabets and spaces.";
        }
        break;
      case "username":
        if (!/^[A-Za-z0-9]{5,12}$/.test(value)) {
          return "Username should be 5-12 characters long and contain no special characters.";
        }
        break;
      case "password":
        if (
          !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
            value
          )
        ) {
          return "Password must be at least 8 characters long, include 1 uppercase, 1 lowercase, 1 number, and 1 special character.";
        }
        break;
      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return "Invalid email address.";
        }
        break;
      case "contact":
        if (!/^\d{10}$/.test(value)) {
          return "Contact number should be exactly 10 digits.";
        }
        break;
      case "dob":
        if (!value) {
          return "Date of Birth is required.";
        }
        const ageCategory = calculateAgeCategory(value);
        if (ageCategory === "Minor") {
          return "You must be at least 18 years old to register.";
        }
        break;
      case "address":
        if (value.trim() === "") {
          return "Address cannot be empty.";
        }
        break;
      case "country":
        if (!/^[A-Za-z\s]+$/.test(value)) {
          return "Country should contain only alphabets and spaces.";
        }
        break;
      case "state":
        if (!/^[A-Za-z\s]+$/.test(value)) {
          return "State should contain only alphabets and spaces.";
        }
        break;
      case "branchName":
        if (value.trim() === "") {
          return "Branch name cannot be empty.";
        }
        break;
      case "initialDeposit":
        if (parseInt(value) < 5000) {
          return "Initial deposit must be at least 5000.";
        }
        break;
      case "idDocumentNo":
        if (value.length > 12) {
          return "ID Document Number should not exceed 12 characters.";
        }
        break;
      default:
        return "";
    }
    return "";
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
    setFormData({ ...formData, [name]: value });

    if (name === "dob") {
      const ageCategory = calculateAgeCategory(value);
      setFormData({ ...formData, dob: value, ageCategory });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields before submission
    const newErrors: { [key: string]: string } = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key as keyof User]);
      if (error) {
        newErrors[key] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Generate a unique 8-digit account number
    const accountNumber = Math.floor(
      10000000 + Math.random() * 90000000
    ).toString();

    const newUser = {
      ...formData,
      accountNumber,
    };

    try {
      const response = await fetch("http://localhost:5000/users");
      const data = await response.json();

      // Append the new user to the existing users
      const updatedUsers = [...data, newUser];

      await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      setIsSubmitted(true);
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  if (isSubmitted) {
    return (
      <div className="registration-success">
        <h1>Registration Successful</h1>
        <p>You can now log in using your credentials.</p>
        <button onClick={() => navigate("/Login")}>Go to Login</button>
      </div>
    );
  }

  return (
    <div className="registration-container">
      <h2>Registration</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          {errors.username && <p className="error">{errors.username}</p>}
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          {errors.address && <p className="error">{errors.address}</p>}
        </div>
        <div>
          <label htmlFor="country">Country:</label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          />
          {errors.country && <p className="error">{errors.country}</p>}
        </div>
        <div>
          <label htmlFor="state">State:</label>
          <input
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          />
          {errors.state && <p className="error">{errors.state}</p>}
        </div>
        <div>
          <label htmlFor="branchName">Branch Name:</label>
          <input
            type="text"
            id="branchName"
            name="branchName"
            value={formData.branchName}
            onChange={handleChange}
            required
          />
          {errors.branchName && <p className="error">{errors.branchName}</p>}
        </div>
        <div>
          <label htmlFor="dob">Date of Birth:</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
          {errors.dob && <p className="error">{errors.dob}</p>}
        </div>
        <div>
          <label htmlFor="accountType">Account Type:</label>
          <select
            id="accountType"
            name="accountType"
            value={formData.accountType}
            onChange={handleChange}
            required
          >
            <option value="">Select Account Type</option>
            <option value="Savings">Savings</option>
            <option value="Current">Current</option>
          </select>
        </div>
        <div>
          <label htmlFor="initialDeposit">Initial Deposit:</label>
          <input
            type="number"
            id="initialDeposit"
            name="initialDeposit"
            value={formData.initialDeposit}
            onChange={handleChange}
            required
          />
          {errors.initialDeposit && (
            <p className="error">{errors.initialDeposit}</p>
          )}
        </div>
        <div>
          <label htmlFor="idProofType">ID Proof Type:</label>
          <select
            id="idProofType"
            name="idProofType"
            value={formData.idProofType}
            onChange={handleChange}
            required
          >
            <option value="">Select ID Proof Type</option>
            <option value="Aadhar">Aadhar</option>
            <option value="PAN">PAN</option>
            <option value="Passport">Passport</option>
          </select>
        </div>
        <div>
          <label htmlFor="idDocumentNo">ID Document Number:</label>
          <input
            type="text"
            id="idDocumentNo"
            name="idDocumentNo"
            value={formData.idDocumentNo}
            onChange={handleChange}
            required
          />
          {errors.idDocumentNo && (
            <p className="error">{errors.idDocumentNo}</p>
          )}
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Registration;

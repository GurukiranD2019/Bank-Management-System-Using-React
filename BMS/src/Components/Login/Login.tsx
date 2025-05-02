import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

interface LoginProps {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/users.json");
      const data = await response.json();

      const user = data.users.find(
        (user: { username: string; password: string }) =>
          user.username === username && user.password === password
      );

      if (user) {
        setIsAuthenticated(true);
        navigate("/Home", { state: { user } });
      } else {
        setError("Invalid username or password");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
      </form>

      {/* New User Registration Button */}
      <div className="registration-link">
        <p>New User?</p>
        <button onClick={() => navigate("/Registration")}>Register Here</button>
      </div>
    </div>
  );
};

export default Login;

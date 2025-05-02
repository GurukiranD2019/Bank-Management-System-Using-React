// filepath: /Users/2174256/Documents/Projects/React Training Case Study/Bank-management-system/src/Components/NotFound/NotFound.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./PageNotFound.css";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <h1>404 Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <button onClick={() => navigate("/")}>Go to Login</button>
    </div>
  );
};

export default NotFound;

import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import Registration from "./Components/Registration/Registration";
import Home from "./Components/Home";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import NotFound from "./Components/PageNotFound";
import Footer from "./Components/Footer/Footer";
import "./index.css";

const Main: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        {/* Login Route */}
        <Route
          path="/"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/Login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />

        {/* Registration Route */}
        <Route path="/Registration" element={<Registration />} />

        {/* Protected Home Route */}
        <Route
          path="/Home"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* 404 Not Found Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Footer */}
      <Footer />
    </Router>
  );
};

// Render the App
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<Main />);

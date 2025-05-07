import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("username"); // Explicitly clear username
    window.location.href = "/";
    // Redirect to the login page
    navigate("/login");
  };

  return (
    <nav
      className="navbar navbar-expand-lg shadow-sm"
      style={{ backgroundColor: "#f5f3ef" }} // Matching soft beige color
    >
      <div className="container">
        <Link className="navbar-brand fw-bold text-dark" to="/">
          GamingStore
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link text-dark fw-medium px-3" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark fw-medium px-3" to="/contactUs">
                Contact Us
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark fw-medium px-3" to="/about">
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark fw-medium px-3" to="/dashboard">
                Dashboard
              </Link>
            </li>
            {!localStorage.getItem("token") && (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-dark fw-medium px-3" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-dark fw-medium px-3" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}
            {localStorage.getItem("token") && (
              <li className="nav-item">
                <Link
                  className="nav-link text-dark fw-medium px-3"
                  to="/"
                  onClick={handleLogout}
                >
                  Disconnect
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

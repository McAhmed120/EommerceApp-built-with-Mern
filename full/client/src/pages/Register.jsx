import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "bootstrap/dist/css/bootstrap.min.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "Client",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Form validation
  const validateForm = () => {
    const validationErrors = {};
    if (!formData.username) validationErrors.username = "Username is required.";
    if (!formData.email) validationErrors.email = "Email is required.";
    if (!formData.password) validationErrors.password = "Password is required.";
    if (formData.password.length < 6)
      validationErrors.password = "Password must be at least 6 characters long.";
    return validationErrors;
  };

  // Handle form submission
  const handleRegister = async (e) => {
    e.preventDefault();
    setErrors({});
    setErrorMessage(null);

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      await API.post("/users/register", formData);
      navigate("/login");
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div
        className="card p-5 shadow-lg"
        style={{
          maxWidth: "450px",
          width: "100%",
          borderRadius: "20px",
          border: "none",
        }}
      >
        <h3 className="text-center mb-4 fw-bold" style={{ color: "#4A90E2" }}>
          Register
        </h3>
        {errorMessage && (
          <div className="alert alert-danger text-center">{errorMessage}</div>
        )}
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label fw-semibold" style={{ color: "#333" }}>
              Username
            </label>
            <input
              type="text"
              name="username"
              className="form-control p-3"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleInputChange}
              style={{
                border: "2px solid #e0e0e0",
                borderRadius: "10px",
              }}
            />
            {errors.username && (
              <small className="text-danger">{errors.username}</small>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold" style={{ color: "#333" }}>
              Email
            </label>
            <input
              type="email"
              name="email"
              className="form-control p-3"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              style={{
                border: "2px solid #e0e0e0",
                borderRadius: "10px",
              }}
            />
            {errors.email && (
              <small className="text-danger">{errors.email}</small>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold" style={{ color: "#333" }}>
              Password
            </label>
            <input
              type="password"
              name="password"
              className="form-control p-3"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              style={{
                border: "2px solid #e0e0e0",
                borderRadius: "10px",
              }}
            />
            {errors.password && (
              <small className="text-danger">{errors.password}</small>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold" style={{ color: "#333" }}>
              Role
            </label>
            <select
              name="role"
              className="form-select p-3"
              value={formData.role}
              onChange={handleInputChange}
              style={{
                border: "2px solid #e0e0e0",
                borderRadius: "10px",
              }}
            >
              <option value="Client">Client</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100 p-3"
            style={{
              borderRadius: "10px",
              backgroundColor: "#4A90E2",
              border: "none",
            }}
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import API from '../services/api';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [generalError, setGeneralError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  // Validate form fields
  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      errors.email = 'Email is required.';
    } else if (!emailRegex.test(email)) {
      errors.email = 'Invalid email format.';
    }

    if (!password) {
      errors.password = 'Password is required.';
    }

    return errors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Reset previous errors
    setValidationErrors({});
    setGeneralError('');

    // Validate form fields
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    try {
      const { data } = await API.post('/users/login', { email, password });
      localStorage.setItem('token', data.token); // Save token to localStorage
      localStorage.setItem('username', data.username); // Save username to localStorage
      navigate('/'); // Redirect to home page after login
    } catch (error) {
      setGeneralError('Wrong email or password. Please try again.');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div
        className="card p-5 shadow-lg"
        style={{
          maxWidth: '450px',
          width: '100%',
          borderRadius: '20px',
          border: 'none',
        }}
      >
        <h3 className="text-center mb-4 fw-bold" style={{ color: '#4A90E2' }}>
          Welcome Back
        </h3>
        <form onSubmit={handleLogin}>
          {generalError && (
            <div className="alert alert-danger text-center">{generalError}</div>
          )}
          <div className="mb-3">
            <label className="form-label fw-semibold" style={{ color: '#333' }}>
              Email
            </label>
            <input
              type="email"
              className={`form-control p-3 ${
                validationErrors.email ? 'is-invalid' : ''
              }`}
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                border: '2px solid #e0e0e0',
                borderRadius: '10px',
              }}
            />
            {validationErrors.email && (
              <div className="invalid-feedback">{validationErrors.email}</div>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold" style={{ color: '#333' }}>
              Password
            </label>
            <input
              type="password"
              className={`form-control p-3 ${
                validationErrors.password ? 'is-invalid' : ''
              }`}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                border: '2px solid #e0e0e0',
                borderRadius: '10px',
              }}
            />
            {validationErrors.password && (
              <div className="invalid-feedback">{validationErrors.password}</div>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100 p-3"
            style={{
              borderRadius: '10px',
              backgroundColor: '#4A90E2',
              border: 'none',
            }}
          >
            Login
          </button>
        </form>
        <div className="text-center mt-4">
          <small style={{ color: '#666' }}>
            Don’t have an account?{' '}
            <a href="/register" className="text-primary fw-bold">
              Register
            </a>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Login;

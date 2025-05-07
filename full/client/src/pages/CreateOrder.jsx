import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import API from '../services/api';

const CreateOrder = () => {
  const { state } = useLocation();
  const { productId } = state || {};
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    adresse: '',
    phone: '',
    products: productId ? [{ product: productId, quantity: 1 }] : [],
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Submitting order:', formData);
      await API.post('/orders', formData);
      alert('Order placed successfully!');
      navigate('/dashboard');
    } catch (err) {
      console.error('Error creating order:', err.message);
      setError('Failed to place the order. Please try again.');
      console.log(err);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="w-100 p-4 shadow-lg rounded bg-light" style={{ maxWidth: "500px" }}>
        <h2 className="text-center fw-bold mb-4">Create Order</h2>
        {error && <p className="text-danger text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Address</label>
            <input
              type="text"
              className="form-control"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input
              type="text"
              className="form-control"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-dark w-100">
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateOrder;

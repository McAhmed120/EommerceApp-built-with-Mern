import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

const UpdateStatus = () => {
  const { orderId } = useParams(); // Get the orderId from the URL
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState(""); // State to manage the selected status
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true); // Loading state
  const [success, setSuccess] = useState(false); // Success message state
  const navigate = useNavigate(); // Navigation for redirection

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const { data } = await API.get(`/orders/${orderId}`); // Fetch order details
        setOrder(data);
        setStatus(data.status); // Set the current status
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to fetch order details. Please try again later."
        );
        console.error("Error fetching order details:", err.response?.data || err.message);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const handleStatusChange = async () => {
    try {
      const { data } = await API.put(`/orders/status/${orderId}`, { status }); // Update order status
      console.log("Status Updated:", data);
      setSuccess(true); // Show success message
      setTimeout(() => {
        navigate("/admin/orders"); // Redirect to orders list after 2 seconds
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update status.");
      console.error("Error updating order status:", err.response?.data || err.message);
    }
  };

  if (loading) {
    return (
      <div className="container mt-4 d-flex justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Update Order Status</h2>

      {success && (
        <div className="alert alert-success" role="alert">
          Order status updated successfully!
        </div>
      )}

      <div className="mb-3">
        <p>
          <strong>Order ID:</strong> {order._id || "N/A"}
        </p>
        <p>
          <strong>Current Status:</strong> {order.status || "N/A"}
        </p>
        <p>
          <strong>Total Price:</strong> ${order.totalPrice?.toFixed(2) || "0.00"}
        </p>
      </div>

      <div className="mb-3">
        <label htmlFor="status" className="form-label">
          Update Status
        </label>
        <select
          id="status"
          className="form-select"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      <button className="btn btn-primary" onClick={handleStatusChange}>
        Update Status
      </button>
    </div>
  );
};

export default UpdateStatus;

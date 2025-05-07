import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

const OrderDetails = () => {
  const { orderId } = useParams(); // Get the orderId from the URL
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const { data } = await API.get(`/orders/${orderId}`); // Fetch order details
        console.log("Order Data:", data); // Inspect structure
        setOrder(data);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to fetch order details. Please try again later."
        );
        console.error("Error fetching order details:", err.response?.data || err.message);
      } finally {
        setLoading(false); // Set loading to false regardless of success or error
      }
    };

    fetchOrderDetails();
  }, [orderId]);

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

  if (!order) {
    return (
      <div className="container mt-4">
        <div className="alert alert-warning" role="alert">
          Order not found.
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Order Details</h2>
      <div className="mb-3">
        <p>
          <strong>Order ID:</strong> {order._id || "N/A"}
        </p>
        <p>
          <strong>Status:</strong> {order.status || "N/A"}
        </p>
        <p>
          <strong>Total Price:</strong> ${order.totalPrice?.toFixed(2) || "0.00"}
        </p>
      </div>


      
    </div>
  );
};

export default OrderDetails;

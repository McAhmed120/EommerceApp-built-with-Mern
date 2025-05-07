import React, { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom"; // For routing to order details

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await API.get("/orders/all"); // Fetch all orders for admin
        setOrders(data);
        console.log("Orders fetched:", data); // Log the fetched orders
      } catch (err) {
        setError("Error fetching orders.");
        console.error("Error fetching orders:", err.message);
      }
    };

    fetchOrders();
  }, []);

  const handleChangeStatus = async (orderId, newStatus) => {
    try {
      await API.put(`/orders/status/${orderId}`, { status: newStatus });      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      setError("Failed to update the order status.");
      console.error("Error updating order status:", err.message);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      await API.delete(`/orders/${orderId}`); // Delete the order
      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
    } catch (err) {
      setError("Failed to delete the order.");
      console.error("Error deleting order:", err.message);
    }
  };

  if (error) {
    return <div className="container mt-4 text-danger">{error}</div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Manage Orders</h2>
      {orders.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Client</th>
                <th>Status</th>
                <th>Total Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.clientId?.username || "no username found"}</td> 
                  <td>{order.status}</td>
                  <td>${order.totalPrice}</td>
                  <td>
                    <Link to={`/order/${order._id}`} className="btn btn-primary btn-sm me-2">
                      View Details
                    </Link>
                    <Link  to={`/orders/update-status/${order._id}`}className="btn btn-warning btn-sm me-2"
                      onClick={() =>
                        handleChangeStatus(order._id, order.status === "Pending" ? "Shipped" : "Pending")
                      }
                    >
                      Change Status
                    </Link>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteOrder(order._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center">No orders to manage.</p>
      )}
    </div>
  );
};

export default ManageOrders;

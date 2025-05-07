import React, { useEffect, useState } from "react";
import API from "../services/api";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [role, setRole] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch logged-in user's profile
        const { data } = await API.get("/users/me");
        setUser(data);
        setRole(data.role);

        if (data.role === "Client") {
          // Fetch client-specific orders
          const ordersData = await API.get("/orders");
          setOrders(ordersData.data);
        }
      } catch (error) {
        console.error("Error fetching user or orders:", error.message);
        setError("Failed to load data. Please try again.");
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
        <div className="text-center p-4 border rounded shadow-sm bg-light" style={{ maxWidth: "400px" }}>
        <h3 className="mb-3 text-warning">You don't have access</h3>
          <p className="text-muted">You need to log in to access this page.</p>
          <a href="/login" className="btn btn-outline-dark w-45 fw-semibold rounded-pill">
            Log In
          </a>
          
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
        <div className="text-center p-4 border rounded shadow-sm bg-light" style={{ maxWidth: "400px" }}>
          <h3 className="mb-3 text-warning">You don't have access</h3>
          <p className="text-muted">You need to log in to access this page.</p>
          <a href="/login" className="btn btn-dark btn-lg mt-3">
            Log In
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2>Welcome, {user.username}</h2>
      <h5>Role: {role}</h5>

      {role === "Client" && (
        <div>
          <h3>Your Orders</h3>
          {orders.length > 0 ? (
            <ul className="list-group">
              {orders.map((order) => (
                <li className="list-group-item" key={order._id}>
                  <h5>Order ID: {order._id}</h5>
                  <p>Status: {order.status}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted">You have no orders yet.</p>
          )}
        </div>
      )}

      {role === "Admin" && (
        <div>
          <h3>Admin Panel</h3>
          <ul className="list-group">
            <li className="list-group-item">
              <a href="/admin/add" className="btn btn-outline-dark">Add Products</a>
            </li>
            <li className="list-group-item">
              <a href="/" className="btn btn-outline-dark">Show Products</a>
            </li>
            <li className="list-group-item">
              <a href="/admin/manage-products" className="btn btn-outline-dark">Manage Products</a>
            </li>
            <li className="list-group-item">
              <a href="/admin/orders" className="btn btn-outline-dark">Manage Orders</a>
            </li>
            <li className="list-group-item">
              <a href="/admin/users" className="btn btn-outline-dark">Manage Users</a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

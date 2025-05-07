import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import 'bootstrap/dist/css/bootstrap.min.css';

const ManageUsers = () => {
  const [users, setUsers] = useState([]); // User list
  const [error, setError] = useState(''); // Error state
  const [loading, setLoading] = useState(true); // Loading state
  const [editUser, setEditUser] = useState(null); // User being edited
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    role: 'Client',
  }); // Form data for editing
  const [validationErrors, setValidationErrors] = useState({}); // Validation errors

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await API.get('/users'); // Fetch users from the backend
        setUsers(data);
      } catch (err) {
        console.error('Error fetching users:', err.message);
        setError('Failed to load users.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Handle Delete
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await API.delete(`/users/${id}`);
        // Optimistically update the state
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
      } catch (error) {
        console.error('Error deleting user:', error.message);
        setError('Failed to delete user. Please try again.');
      }
    }
  };

  // Handle Edit
  const handleEdit = (user) => {
    setEditUser(user);
    setFormData({
      username: user.username,
      email: user.email,
      role: user.role,
    });
    setValidationErrors({});
  };

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate Form Data
  const validateForm = () => {
    const errors = {};
    if (!formData.username) errors.username = 'Username is required.';
    if (!formData.email) errors.email = 'Email is required.';
    if (!formData.role) errors.role = 'Role is required.';
    return errors;
  };

  // Handle Save
  const handleSave = async () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors); // Set validation errors if any
      return;
    }

    try {
      const updatedUser = {
        username: formData.username,
        email: formData.email,
        role: formData.role,
      };

      const { data } = await API.put(`/users/${editUser._id}`, updatedUser);

      // Update the user in the state
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user._id === data._id ? data : user))
      );

      // Clear edit state
      setEditUser(null);
      setValidationErrors({});
    } catch (error) {
      console.error('Error updating user:', error.message);
      setError('Failed to update user. Please try again.');
    }
  };

  // Handle Cancel
  const handleCancel = () => {
    setEditUser(null);
    setValidationErrors({});
  };

  return (
    <div className="container mt-5">
      <h2>Manage Users</h2>
      {loading ? (
        <p>Loading users...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : (
        <>
          <table className="table table-striped mt-3">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Edit User Form */}
          {editUser && (
            <div className="card p-4 mt-5 shadow-sm">
              <h3 className="text-center mb-4 text-dark">Edit User</h3>
              <form>
                <div className="mb-3">
                  <label className="form-label fw-bold">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                  />
                  {validationErrors.username && (
                    <small className="text-danger">{validationErrors.username}</small>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  {validationErrors.email && (
                    <small className="text-danger">{validationErrors.email}</small>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Role</label>
                  <select
                    className="form-select"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                  >
                    <option value="Client">Client</option>
                    <option value="Admin">Admin</option>
                  </select>
                  {validationErrors.role && (
                    <small className="text-danger">{validationErrors.role}</small>
                  )}
                </div>
                <div className="d-flex justify-content-center">
                  <button
                    type="button"
                    className="btn btn-outline-dark me-3 px-4"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-danger px-4"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ManageUsers;

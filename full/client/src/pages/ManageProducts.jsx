import React, { useEffect, useState } from 'react';
import API from '../services/api';
import 'bootstrap/dist/css/bootstrap.min.css';

const ManageProducts = () => {
  const [products, setProducts] = useState([]); // Product list
  const [error, setError] = useState(''); // Error state
  const [loading, setLoading] = useState(true); // Loading state
  const [editProduct, setEditProduct] = useState(null); // Product being edited
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    stock: '', // Added stock field
    image: null, // For file upload
  }); // Form data for editing
  const [validationErrors, setValidationErrors] = useState({}); // Validation errors

  // Fetch products from the backend
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await API.get('/products');
      setProducts(data);
    } catch (err) {
      console.error('Error fetching products:', err.message);
      setError('Failed to load products.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(); // Fetch products on component mount
  }, []);

  // Handle Delete
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await API.delete(`/products/${id}`);
        // Optimistically update state after deletion
        setProducts((prevProducts) => prevProducts.filter((product) => product._id !== id));
      } catch (error) {
        console.error('Error deleting product:', error.message);
        setError('Failed to delete product. Please try again.');
      }
    }
  };

  // Handle Edit
  const handleEdit = (product) => {
    setEditProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      description: product.description,
      stock: product.stock, // Populate stock field
      image: null, // Reset image on edit
    });
    setValidationErrors({}); // Clear validation errors
  };

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle Image Change (for file upload)
  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  // Validate Form Data
  const validateForm = () => {
    const errors = {};
    if (!formData.name) errors.name = 'Name is required.';
    if (!formData.price) errors.price = 'Price is required.';
    if (!formData.stock) errors.stock = 'Stock is required.'; // Add validation for stock
    if (!formData.description) errors.description = 'Description is required.';
    return errors;
  };

  // Handle Save
  const handleSave = async () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors); // Display validation errors
      return;
    }

    try {
      const updatedProduct = new FormData();
      updatedProduct.append('name', formData.name);
      updatedProduct.append('price', formData.price);
      updatedProduct.append('description', formData.description);
      updatedProduct.append('stock', formData.stock); // Append stock field
      if (formData.image) {
        updatedProduct.append('image', formData.image); // Append image if exists
      }

      // Update product in backend
      const { data } = await API.put(`/products/${editProduct._id}`, updatedProduct, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // Immediately update state without refreshing
      setProducts((prevProducts) =>
        prevProducts.map((product) => (product._id === data._id ? data : product))
      );

      // Clear edit state and form
      setEditProduct(null);
      setValidationErrors({});
    } catch (error) {
      console.error('Error updating product:', error.message);
      setError('Failed to update product. Please try again.');
    }
  };

  // Handle Cancel
  const handleCancel = () => {
    setEditProduct(null);
    setValidationErrors({});
  };

  return (
    <div className="container mt-5">
      <h2>Manage Products</h2>
      {loading ? (
        <p>Loading products...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : (
        <div>
          <table className="table table-striped mt-3">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Stock</th> {/* Added stock column */}
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.stock}</td> {/* Display stock */}
                  <td>{product.description}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEdit(product)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Edit Product Form */}
          {editProduct && (
            <div className="card p-4 mt-5 shadow-sm">
              <h3 className="text-center mb-4 text-dark">Edit Product</h3>
              <form>
                <div className="mb-3">
                  <label className="form-label fw-bold">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                  {validationErrors.name && (
                    <small className="text-danger">{validationErrors.name}</small>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Price</label>
                  <input
                    type="number"
                    className="form-control"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                  />
                  {validationErrors.price && (
                    <small className="text-danger">{validationErrors.price}</small>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Stock</label>
                  <input
                    type="number"
                    className="form-control"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                  />
                  {validationErrors.stock && (
                    <small className="text-danger">{validationErrors.stock}</small>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Description</label>
                  <textarea
                    className="form-control"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                  {validationErrors.description && (
                    <small className="text-danger">{validationErrors.description}</small>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Image</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={handleImageChange}
                  />
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
        </div>
      )}
    </div>
  );
};

export default ManageProducts;

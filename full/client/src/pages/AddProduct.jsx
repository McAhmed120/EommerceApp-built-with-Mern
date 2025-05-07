import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import API from '../services/api';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
  });
  const [image, setImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name) errors.name = 'Product name is required.';
    if (!formData.description) errors.description = 'Description is required.';
    if (!formData.price || formData.price <= 0) errors.price = 'Price must be greater than 0.';
    if (!formData.stock || formData.stock < 0) errors.stock = 'Stock must be 0 or greater.';
    if (!image) errors.image = 'Product image is required.';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    const productData = new FormData();
    productData.append('name', formData.name);
    productData.append('description', formData.description);
    productData.append('price', formData.price);
    productData.append('stock', formData.stock);
    productData.append('image', image);

    try {
      const response = await API.post('/products', productData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setSuccessMessage('Product added successfully!');
      setErrorMessage('');
      setFormData({
        name: '',
        description: '',
        price: '',
        stock: '',
      });
      setImage(null);

      navigate('/');
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || 'Failed to add product. Please try again.'
      );
    }
  };

  return (
    <div className="container my-5">
      <div className="card shadow-sm p-4">
        <h2 className="text-center mb-4 text-dark">Add New Product</h2>
        {successMessage && <div className="alert alert-success">{successMessage}</div>}
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-3">
            <label className="form-label fw-bold">Product Image</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={handleImageChange}
            />
            {validationErrors.image && (
              <small className="text-danger">{validationErrors.image}</small>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Product Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            {validationErrors.name && <small className="text-danger">{validationErrors.name}</small>}
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Description</label>
            <textarea
              className="form-control"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            ></textarea>
            {validationErrors.description && (
              <small className="text-danger">{validationErrors.description}</small>
            )}
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
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
            <div className="col-md-6 mb-3">
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
          </div>
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-outline-dark px-5">
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;

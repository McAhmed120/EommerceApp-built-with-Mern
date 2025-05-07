import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import API from '../services/api';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const Home = () => {
  const [username, setUsername] = useState(localStorage.getItem('username') || ''); // Initialize from localStorage
  const [products, setProducts] = useState([]); // Store products
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize navigate for routing

  // Fetch user info
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const { data } = await API.get('/users/me'); // Fetch the logged-in user's info
          setUsername(data.username);
          localStorage.setItem('username', data.username); // Update username in localStorage
        } else {
          setUsername(''); // Clear username if no token
          localStorage.removeItem('username'); // Remove username from localStorage
        }
      } catch (error) {
        console.error('Error fetching user info:', error.message);
        setUsername(''); // Clear username on error
        localStorage.removeItem('username'); // Remove username from localStorage
      }
    };

    fetchUserInfo();
  }, []); // Dependency array ensures this runs on mount

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await API.get('/products'); 
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err.message);
        setError('Failed to load products.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleOrderNow = (productId) => {
    navigate('/create-order', { state: { productId } }); // Navigate to order creation page with product ID
  };

  return (
    <div className="container text-center">
      <h1 className="fw-bold">Welcome Dear {username}</h1> 
      <h5 className="text-secondary">To our Online Store</h5>

      {/* Products Section */}
      <div className="mt-5">
        <h2 className="text-center mb-4">Explore Our Products</h2>
        {loading && <div>Loading products...</div>}
        {error && <div className="text-danger">{error}</div>}
        <div className="row">
          {products.map((product) => (
            <div className="col-md-4 mb-4" key={product._id}>
              <div className="card h-100 shadow-lg border-0 rounded-3 text-center position-relative">
                <img
                  src={`http://localhost:5000/${product.imageUrl}`}
                  className="card-img-top rounded-3"
                  alt={product.name}
                  style={{ height: '250px', objectFit: 'contain' }}
                />
                <div className="card-body">
                  <h5 className="card-title text-dark fw-bold">{product.name}</h5>
                  <p className="card-text text-text-muted df-flex">
                    <strong className="text-dark">Stock: {product.stock}</strong> <br />
                    <strong className="text-dark">Price : {product.price} $ </strong>
                  </p>
                  <button
                    className="btn btn-outline-dark w-45 fw-semibold rounded-pill"
                    onClick={() => handleOrderNow(product._id)}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

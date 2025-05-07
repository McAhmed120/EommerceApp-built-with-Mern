import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Your backend base URL
});

// Add Authorization header if the user is logged in
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token'); // Assuming you're storing the JWT in localStorage
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;

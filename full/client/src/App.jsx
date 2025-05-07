import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // Import the Navbar component
import Footer from './components/Footer'; // Import the Footer component
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register'; // Import the Register page
import Dashboard from "./pages/Dashboard";
import ManageProducts from './pages/ManageProducts'; // Import
import AddProduct from './pages/AddProduct';
import AboutUs from './pages/AboutUs'
import ManageUsers from './pages/ManageUsers'
import CreateOrder from './pages/CreateOrder'
import ManageOrders from './pages/ManageOrders'
import OrderDetails from './pages/OrderDetails'
import UpdateStatus from "./pages/UpdateStatus"
import ContactUs from "./pages/ContactUs"

const App = () => {
  return (
    <Router>
      <div>
        {/* Navbar */}
        <Navbar />
        {/* Main Content */}
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} /> {/* Add the Register Route */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin/manage-products" element={<ManageProducts />} />
            <Route path="/admin/add" element={<AddProduct />} />
            <Route path="/about" element={<AboutUs/>} />
            <Route path="/admin/users" element={<ManageUsers/>} />
            <Route path="/create-order" element={<CreateOrder/>} />
            <Route path="/admin/orders" element={<ManageOrders/>} />
            <Route path="/order/:orderId" element={<OrderDetails />} />
            <Route path="/orders/update-status/:orderId" element={<UpdateStatus />} />
            <Route path="/contactUs" element={<ContactUs />} />
          </Routes>
        </div>
        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;

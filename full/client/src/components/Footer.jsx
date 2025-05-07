import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Footer = () => {
  return (
    <footer style={{ backgroundColor: "#f5f3ef" }} className="text-dark py-5">
      <div className="container">
        <div className="row">
          {/* Company Info & CTA */}
          <div className="col-lg-4">
            <h4 className="fw-bold">GamingStore</h4>
            <p className="text-muted">
              A seamless shopping experience, designed to offer quality products at unbeatable prices.
            </p>
            <Link to="/register" className="btn btn-dark rounded-pill px-4">
              Join Now
            </Link>
          </div>

          {/* Features Section */}
          <div className="col-lg-2">
            <h6 className="fw-bold">Features</h6>
            <ul className="list-unstyled text-muted">
              <li><Link to="#" className="text-decoration-none text-muted">Live Chat</Link></li>
              <li><Link to="#" className="text-decoration-none text-muted">AI Automation</Link></li>
              <li><Link to="#" className="text-decoration-none text-muted">Order Tracking</Link></li>
              <li><Link to="#" className="text-decoration-none text-muted">Secure Payments</Link></li>
            </ul>
          </div>

          {/* Resources Section */}
          <div className="col-lg-2">
            <h6 className="fw-bold">Resources</h6>
            <ul className="list-unstyled text-muted">
              <li><Link to="#" className="text-decoration-none text-muted">Help Center</Link></li>
              <li><Link to="#" className="text-decoration-none text-muted">Affiliate Program</Link></li>
              <li><Link to="#" className="text-decoration-none text-muted">Community Forum</Link></li>
              <li><Link to="#" className="text-decoration-none text-muted">Blog</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-lg-3">
            <h6 className="fw-bold">Contact</h6>
            <p className="text-muted"><i className="bi bi-geo-alt-fill"></i> New York, NY 10012, US</p>
            <p className="text-muted"><i className="bi bi-envelope-fill"></i> support@ecomdev.com</p>
            <p className="text-muted"><i className="bi bi-telephone-fill"></i> +1 234 567 890</p>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-4 text-muted" />

        {/* Social Media & Copyright */}
        <div className="d-flex justify-content-between align-items-center">
          <p className="text-muted mb-0">&copy; {new Date().getFullYear()} EcomDev. All Rights Reserved.</p>
          <div>
            <a href="#" className="text-dark me-3"><i className="bi bi-facebook"></i></a>
            <a href="#" className="text-dark me-3"><i className="bi bi-twitter"></i></a>
            <a href="#" className="text-dark me-3"><i className="bi bi-instagram"></i></a>
            <a href="#" className="text-dark"><i className="bi bi-linkedin"></i></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

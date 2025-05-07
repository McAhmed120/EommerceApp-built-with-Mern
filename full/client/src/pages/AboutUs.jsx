import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AboutUs = () => {
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center mt-5">
      <h2 className="text-dark mb-4 text-center">About Us</h2>
      <div className="text-center w-75">
        <h3 className="text-dark">Our Mission</h3>
        <p className="text-muted">
          Welcome to our eCommerce platform! We are dedicated to providing you with the best
          products at unbeatable prices. Our mission is to make shopping easy, accessible, and
          enjoyable for everyone.
        </p>
        <h3 className="text-dark">Who We Are</h3>
        <p className="text-muted">
          We are a team of passionate professionals committed to curating the best products for
          our customers. From gadgets to fashion, we offer a wide variety of items to cater to
          your needs.
        </p>
        <h3 className="text-dark">Why Choose Us?</h3>
        <ul className="list-unstyled text-muted">
          <li>✔ Quality products at affordable prices</li>
          <li>✔ Fast and reliable delivery</li>
          <li>✔ 24/7 customer support</li>
          <li>✔ A seamless shopping experience</li>
        </ul>
      </div>
      <div className="text-center mt-5">
        <h4 className="text-secondary">Thank you for choosing us!</h4>
        <p className="text-muted">We look forward to serving you.</p>
      </div>
    </div>
  );
};

export default AboutUs;

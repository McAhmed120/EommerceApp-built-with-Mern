import React from "react";

const ContactUs = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="w-100 p-4 shadow-lg rounded" style={{ maxWidth: "600px" }}>
        <h2 className="text-center fw-bold">Contact Us</h2>
        <p className="text-center text-muted">We'll get back to you within 24 hours.</p>
        
        <form>
          <div className="row mb-3">
            <div className="col">
              <label className="form-label">First name</label>
              <input type="text" className="form-control" placeholder="First name" />
            </div>
            <div className="col">
              <label className="form-label">Last name</label>
              <input type="text" className="form-control" placeholder="Last name" />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" placeholder="" />
          </div>

          <div className="mb-3">
            <label className="form-label">Phone number</label>
            <input type="tel" className="form-control" placeholder="" />
          </div>

          <div className="mb-3">
            <label className="form-label">Message</label>
            <textarea className="form-control" rows="4" placeholder=""></textarea>
          </div>

          <button type="submit" className="btn btn-dark w-100">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
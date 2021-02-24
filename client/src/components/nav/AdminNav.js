import React from "react";
import { Link } from "react-router-dom";

// yeh sare route bana deye hai jo admin ko zarorat hote hai uske side me
const AdminNav = () => (
  <nav>
    <ul className="nav flex-column">
      <li className="nav-item">
        <Link to="/admin/dashboard" className="nav-link">
          Dashboard
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/admin/product" className="nav-link">
          Product
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/admin/products" className="nav-link">
          Products
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/admin/category" className="nav-link">
          Category
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/admin/sub" className="nav-link">
          Sub Category
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/admin/coupon" className="nav-link">
          Coupon
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/user/password" className="nav-link">
          Password
        </Link>
      </li>
      <li className="nav-item text-success">
        <Link to="/admin/notProcessed" className="nav-link text-success">
          Not Processed
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/admin/cashOnDelivery" className="nav-link text-success">
          Cash On Delivery
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/admin/processing" className="nav-link text-success">
          Processing
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/admin/dispatched" className="nav-link text-success">
          DisPatched
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/admin/cancelled" className="nav-link text-success">
          Cancelled
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/admin/completed" className="nav-link text-success">
          Completed
        </Link>
      </li>
    </ul>
  </nav>
);

export default AdminNav;

import React from "react";
import { NavLink } from "react-router-dom";

function Home() {
  return (
    <React.Fragment>
      <NavLink className="navbar-brand" to="/">
        Navbar
      </NavLink>
      
      <button
        className="navbar-toggler ml-a"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <NavLink to="/" className="nav-link " aria-current="page">
              Home
            </NavLink>
          </li>
          <li to="cart" className="nav-item">
            <NavLink to="/cart" className="nav-link">
              Cart
            </NavLink>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
}

export default Home;

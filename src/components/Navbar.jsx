import React from "react";

import Home from "./Home";

function Navbar({ onSortClick, onChange }) {


  return (
    <div className="">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Home></Home>
        <div className="container-fluid justify-content-lg-end justify-content-sm-center">
          <div className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={(e) => onChange(e.target.value)}
            ></input>

            <button
              className="btn btn-outline-success mx-2"
              onClick={onSortClick}
            >
              sort
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;

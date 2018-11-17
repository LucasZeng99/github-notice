import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="navbar-nav navbar-collapse">
        <Link className="nav-item nav-link" to="/">
          Activities <span className="sr-only">(current)</span>
        </Link>
        <Link className="nav-item nav-link" to="/settings">
          Settings
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

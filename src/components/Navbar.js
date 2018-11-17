import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-light row ">
      <Link
        className="nav-item nav-link col-md-6"
        to="/"
        style={{ textAlign: "center" }}
      >
        Activities <span className="sr-only">(current)</span>
      </Link>
      <Link
        className="nav-item nav-link col-md-6"
        to="/settings"
        style={{ textAlign: "center" }}
      >
        Settings
      </Link>
    </nav>
  );
};

export default Navbar;

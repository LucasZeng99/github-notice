import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navBar bg-light">
      <div className="navLink">
        <Link to="/">
          Activities <span className="sr-only">(current)</span>
        </Link>
      </div>

      <div className="navLink">
        <Link to="/settings">Settings</Link>{" "}
      </div>
    </nav>
  );
};

export default Navbar;

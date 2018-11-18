import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  state = { activityActive: true, settingsActive: false };
  toggleActive = () => {};
  render() {
    return (
      <nav className="navBar">
        <div className={`navLink ${this.state.activityActive && "active"}`}>
          <Link to="/" onClick={this.toggleActive}>
            Activities
          </Link>
        </div>

        <div className={`navLink ${this.state.settingsActive && "active"}`}>
          <Link to="/settings" onClick={this.toggleActive}>
            Settings
          </Link>
        </div>
      </nav>
    );
  }
}

export default Navbar;

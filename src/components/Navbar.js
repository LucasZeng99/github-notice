import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  state = { activityActive: true, settingsActive: false };
  toggleActive = (activity, settings) => {
    this.setState({
      activityActive: activity,
      settingsActive: settings
    });
  };
  render() {
    return (
      <nav className="navBar">
        <div className={`navLink ${this.state.activityActive && "active"}`}>
          <Link to="/" onClick={() => this.toggleActive(true, false)}>
            Activities
          </Link>
        </div>

        <div className={`navLink ${this.state.settingsActive && "active"}`}>
          <Link to="/settings" onClick={() => this.toggleActive(false, true)}>
            Settings
          </Link>
        </div>
      </nav>
    );
  }
}

export default Navbar;

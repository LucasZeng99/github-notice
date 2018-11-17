import React, { Component } from "react";
import { Settings } from "../store/index";
import Form from "./Form";
const settings = new Settings();

class SettingsView extends Component {
  state = {};
  render() {
    return (
      <div className="container" style={{ width: "300px", height: "400px" }}>
        <div className="row">
          <button className="add">Add</button>
          <Form />
        </div>
      </div>
    );
  }
}

export default SettingsView;

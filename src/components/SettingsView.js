import React, { Component } from "react";
import { Settings } from "../store/index";
import Form from "./Form";

const settings = new Settings();

class SettingsView extends Component {
  state = {
    formActive: false
  };
  checkAndSave = async e => {
    e.preventDefault();
    const name = e.target.elements.name.value;
    if (await settings.checkUserName(name)) {
      settings.saveCurrentUser();
    }
  };
  render() {
    return (
      <div className="container" style={{ width: "300px", height: "400px" }}>
        <div className="row">
          <button className="add">Add</button>
          <Form checkAndSave={this.checkAndSave} />
        </div>
      </div>
    );
  }
}

export default SettingsView;

import React, { Component } from "react";
import { Settings, Store } from "../store/index";
import Form from "./Form";

import Close from "@material-ui/icons/Close";

const settings = new Settings();
const store = new Store();

class SettingsView extends Component {
  state = { usernames: [], showForm: false };
  checkAndSave = async e => {
    e.preventDefault();
    const name = e.target.elements.name.value;
    if (await settings.checkUserName(name)) {
      settings.saveCurrentUser();
      let usernames = store.snapUserNames();
      this.setState({
        usernames
      });
    }
  };

  toggleForm = () => {
    this.setState({
      showForm: !this.state.showForm
    });
  };

  dispUserName = () => {
    const usernames = store.snapUserNames();
    let list = [];
    usernames.map(username => {
      list.push(
        <div className="user" key={username}>
          <div className="text">{username}</div>
          <div className="removeButtonContainer">
            <button
              className="removeButton"
              onClick={() => this.removeUser(username)}
            >
              <Close />
            </button>
          </div>
        </div>
      );
    });
    return list;
  };

  removeUser = username => {
    settings.removeUser(username);
    let usernames = store.snapUserNames();
    this.setState({ usernames });
  };

  importUser () {
    
  }

  render() {
    return (
      <div style={{ width: "300px", height: "400px" }}>
        <div className="col justify-content-center">
          <div className="buttonContainer">
            <button className="button" onClick={this.toggleForm} onBlur={this.toggleForm}>
              Add
            </button>
            <button className="button" onClick={this.login}>
              Import
            </button>
          </div>
          {this.state.showLogin && <Form submitFunction={this.login} msg={"github username"}/>}
          {this.state.showForm && <Form submitFunction={this.checkAndSave} msg={"Enter name"}/>}
        </div>

        <div className="userContainer">{this.dispUserName()}</div>
      </div>
    );
  }
}

export default SettingsView;

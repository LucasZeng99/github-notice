import React, { Component } from "react";
import { Settings, Store } from "../store/index";
import Form from "./Form";

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
        <div key={username}>
          <span>{username}</span>
          <span>
            <button onClick={() => this.removeUser(username)}>X</button>
          </span>
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

  render() {
    return (
      <div style={{ width: "300px", height: "400px" }}>
        <div className="col justify-content-center">
          <div className="buttonContainer">
            <button className="button" onClick={this.toggleForm}>
              Add
            </button>
          </div>

          {this.state.showForm && <Form checkAndSave={this.checkAndSave} />}
        </div>
        <div className="col userContainer">{this.dispUserName()}</div>
      </div>
    );
  }
}

export default SettingsView;

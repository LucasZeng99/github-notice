import React, { Component } from "react";
import { Settings, Store } from "../store/index";
import Form from "./Form";

const settings = new Settings();
const store = new Store();

class SettingsView extends Component {
  state = { usernames: [] };
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
      <div className="container" style={{ width: "300px", height: "400px" }}>
        <div className="row">
          <button className="add">Add</button>
          <Form checkAndSave={this.checkAndSave} />
        </div>
        <div className="col userContainer">{this.dispUserName()}</div>
      </div>
    );
  }
}

export default SettingsView;

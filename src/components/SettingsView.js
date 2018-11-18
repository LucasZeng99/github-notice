import React, { Component } from "react";
import { ReactDOM } from "react-dom";
import { Settings, Store } from "../store/index";
import Form from "./Form";

import Close from "@material-ui/icons/Close";

const settings = new Settings();
const store = new Store();

class SettingsView extends Component {
  state = { usernames: [], showForm: false, onInput: false };

  componentDidMount() {
    document.addEventListener("mousedown", this.collaspeForm);
  }
  collaspeForm = () => {
    this.state.onInput &&
      this.setState({
        showForm: false,
        onInput: false
      });
  };
  onInput = () => {
    this.setState({
      onInput: true
    });
  };
  outInput = () => {
    this.setState({
      onInput: false
    });
  };
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

  clearAll = () => {
    settings.cleanUsers();
    let usernames = store.snapUserNames();
    this.setState({ usernames });
  };
  importUser() {}

  render() {
    return (
      <div style={{ width: "300px", height: "400px" }}>
        <div className="col justify-content-center">
          <div className="buttonContainer">
            <div>
              <button className="add" onClick={this.toggleForm}>
                Add
              </button>
            </div>
            <div>
              <button className="style1 import" onClick={this.importUser}>
                Import
              </button>
            </div>
            <div>
              <button className="style1 clearAll" onClick={this.clearAll}>
                Clear
              </button>
            </div>
          </div>
          {this.state.showLogin && (
            <Form
              submitFunction={this.login}
              msg={"github username"}
              onInput={this.onInput}
              outInput={this.outInput}
            />
          )}
          {this.state.showForm && (
            <Form
              submitFunction={this.checkAndSave}
              msg={"Enter name"}
              onInput={this.onInput}
              outInput={this.outInput}
            />
          )}
        </div>

        <div className="userContainer">{this.dispUserName()}</div>
      </div>
    );
  }
}

export default SettingsView;

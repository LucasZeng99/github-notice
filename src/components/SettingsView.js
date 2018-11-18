import React, { Component } from "react";
import { Settings, Store, fetchGithub } from "../store/index";
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
        onInput: false,
        showImport: false
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

  toggleImportForm = () => {
    this.setState({
      showImport: !this.state.showImport
    })
  }

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

  importUser  = async (e) => {
    e.preventDefault();
    const name = e.target.elements.name.value;
    let username = await settings.checkUserName(name)
    if (username) {
      let { data } = await fetchGithub(
        `https://api.github.com/users/${username}/following`
      );
      let usersArray = data;
      for (let i = 0; i < usersArray.length; i++) {
        settings.saveCurrentUser(usersArray[i], usersArray[i].login);
      }

      let usernames = store.snapUserNames()
      this.setState({usernames})
    }
  }

  clearAll = () => {
    settings.cleanUsers();
    let usernames = store.snapUserNames();
    this.setState({ usernames });
  };
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
              <button className="style1 import" onClick={this.toggleImportForm}>
                Import
              </button>
            </div>
            <div>
              <button className="style1 clearAll" onClick={this.clearAll}>
                Clear
              </button>
            </div>
          </div>
          {this.state.showImport && (
            <Form
              submitFunction={this.importUser}
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

import _ from "lodash";
import axios from "axios";
let usernames = [];
let users = [];
let activities = [];

export class Store {
  constructor() {
    if (usernames.length === 0 || users.length === 0) syncFromLocalStorage();
  }

  snapUserNames() {
    return usernames;
  }

  snapUsers() {
    return users;
  }

  getUserData(username) {
    for (let i = 0; i < users.length; i++) {
      if (_.toLower(users.login) === _.toLower(username)) {
        return users[i];
      }
    }
    return null;
  }

  async getUserActivities(username) {
    let i = 0;
    for (; i < usernames.length; i++) {
      if (_.toLower(username) === _.toLower(usernames[i])) break;
    }

    if (i < usernames.length) {
      let res = await fetchGithub(
        "https://api.github.com/users/" + users[i].login + "/events",
        () => console.log("cannot fetch user", users[i].login, " data")
      );
      console.log("fetched activities: ", res.data);
      if (res) return res.data;
    }
    return null;
  }
}

export class Settings {
  constructor() {
    this.targetUser = {};
    this.targetUserName = "";
    if (usernames.length === 0 || users.length === 0) syncFromLocalStorage();
  }

  async checkUserName(username) {
    // return true or false, call saveCurrentUser if true.
    let res = await fetchGithub(
      "https://api.github.com/users/" + username,
      () => console.log(`username ${username} not found`)
    );
    if (res) {
      this.targetUser = res.data;
      this.targetUserName = res.data.login;
      console.log("target user name: ", this.targetUserName);
      return true;
    }
    return false;
  }

  saveCurrentUser() {
    console.log(this.targetUserName, usernames);
    for (let i = 0; i < usernames.length; i++) {
      console.log(usernames[i], this.targetUserName);
      if (_.toLower(usernames[i]) === _.toLower(this.targetUserName)) return;
    }
    if (!this.targetUser) return;

    usernames.push(this.targetUserName);
    users.push(this.targetUser);
    updateLocalStorage();
  }
  removeUser(username) {
    usernames = usernames.filter(u => u !== username);
    users = users.filter(u => u.login !== username);
    updateLocalStorage();
  }
  cleanUsers() {
    usernames = [];
    users = [];
    updateLocalStorage();
  }
}

async function fetchGithub(url, msg) {
  let res;
  try {
    res = await axios.get(url);
  } catch (error) {
    if (error.response.status === 404) {
      msg();
    } else throw error;
  }
  return res;
}

function syncFromLocalStorage() {
  users = JSON.parse(localStorage.getItem("users")) || [];
  usernames = JSON.parse(localStorage.getItem("usernames")) || [];
}

function updateLocalStorage() {
  if (users) {
    localStorage.setItem("usernames", JSON.stringify(usernames));
    localStorage.setItem("users", JSON.stringify(users));
  } else {
    localStorage.removeItem("usernames");
    localStorage.removeItem("users");
  }
}

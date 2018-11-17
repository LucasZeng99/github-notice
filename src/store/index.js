import _ from 'lodash'
import axios from 'axios'
let usernames = []
let users = []
let activities = []


export class Store {
    constructor () {
        if (usernames.length === 0 || users.length === 0) syncFromLocalStorage()
    }
    
    snapUserNames () {
        return usernames
    }

    snapUsers () {
        return users
    }

    getUserData (username) {
        for (let i = 0; i < users.length; i++) {
            if (_.toLower(users.login) === _.toLower(username)) {
                return users[i]
            }
        }
        return null
    }

    getUserActivities (username) {

    }
}

export class Settings {
    constructor () {
        this.targetUser = {}
        this.targetUserName = ''
    }

    async checkUserName (username) { // return true or false, call saveCurrentUser if true.
        let res
        try {
            res = await fetchGithub('https://api.github.com/users/' + username, () => console.log(`username ${username} not found`))
        } catch (e) {
            if (e.response.status === 404) {}
            else throw new Error("not 404")
        }

        if (res) {
            this.targetUser = res.data
            this.targetUserName = res.data.login
            return true
        }
        return false
    }

    saveCurrentUser () {
        usernames.push(this.targetUserName)
        users.push(this.targetUser)
        updateLocalStorage()
    }
}

async function fetchGithub (url, msg) {
    let res
    try {
      res = await axios.get(url)
    } catch (error) {
      if (error.response.status === 404) {
        msg()
      } else throw error
    }
    return res
}

function syncFromLocalStorage () {
    users = localStorage.getItem('users') || []
    usernames = localStorage.getItem('usernames') || []
}

function updateLocalStorage () {
    if (users) {
      localStorage.setItem('usernames', JSON.stringify(usernames))
      localStorage.setItem('users', JSON.stringify(users))
    } else {
      localStorage.removeItem('usernames')
      localStorage.removeItem('users')
    }
  }
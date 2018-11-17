import _ from 'lodash'
import axios from 'axios'
let usernames = []
let users = []
let activities = []

export class Store {
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

    checkUserName (username) {

    }

    upda
}

let fetchGithub = async (url, msg) => {

}
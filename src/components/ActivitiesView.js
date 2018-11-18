import React, { Component } from "react";
import { Store } from "../store/index";

const store = new Store();

class ActivitiesView extends Component {
  
  state = {
    activities: {},
    usernames: []
  }

  async fetchActivities () {
    let _activities = []
    let usernames = store.snapUserNames()
    _activities = await Promise.all(usernames.map(name => store.getUserActivities(name)))

    let activities = {}
    for (let i = 0; i < _activities.length; i++) {
      activities[usernames[i]] = _activities[i]
    }
    
    console.log(activities)
    normalizeActivities(activities)
    console.log("after normalization: ", activities)

    this.setState({activities})
  }

  fetchUserNames () {
    this.setState({
      usernames: store.snapUserNames()
    })
  }

  componentDidMount () {
    this.fetchUserNames()
    this.fetchActivities()
  }

  renderActivities () {
    let renderEl = []

  }

  render () {
    return (
      <div className="container" style={{ width: "300px", height: "400px" }}>
        Activities
        {this.renderActivities()}
      </div>
    )
  }
};

export default ActivitiesView;


export function normalizeActivities (activities) {
  for (let name of Object.keys(activities)) {
    let events = activities[name]

    let newEvents = []
    let newEvent = {
      type: '',
      repo: {},
      count: 0
    }

    let i = 0
    while (i < events.length) {
      let event = events[i]
      if (newEvent && newEvent.type === event.type && newEvent.repo === event.repo) {
        newEvent.count += event.payload.size || 1
      }
      else {
        if (Boolean(newEvent.type)) newEvents.push(newEvent)
        newEvent = {
          type: event.type,
          repo: event.repo,
          count: event.payload.size || 1
        }
      }
      i++
    }

    if (!!newEvent.type) newEvents.push(newEvent)
    
    return newEvents
  }
}
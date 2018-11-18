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
    activities = normalizeActivities(activities)
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
    let renderedEvents = []
    let activities = this.state.activities || {}
    
    let event
    let keys = Object.keys(activities)
    for (let i = 0; i < keys.length; i++) {
      for (let j = 0; j < activities[keys[i]].length; j++) {
        event = activities[keys[i]][j]
        console.log(event)
        let type = (event.count > 1) ? event.type + 's' : event.type
        renderedEvents.push(
          <div>
          {keys[i]}: {event.count} {type} on {event.repo.name}
          </div>
          )
      }
    }

    return renderedEvents
  }

  render () {
    return (
      <div className="container" style={{ width: "300px", height: "400px" }}>
        {this.renderActivities()}
      </div>
    )
  }
};

export default ActivitiesView;


export function normalizeActivities (activities) {
  let finalActivities = {}
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
      mapEventType(event)
      mapEventRepo(event, name)
      if (newEvent && newEvent.type === event.type && newEvent.repo.name === event.repo.name) {
        newEvent.count += event.payload.size || 1
        console.log("same obj")
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
      
    finalActivities[name] = newEvents
  }
  return finalActivities
}

function mapEventType (event) {
  switch (event.type) {
    case "PushEvent":
      event.type = "commit"
      break;
    case "IssuesEvent":
      event.type = "issue"
      break;
    case "WatchEvent":
      event.type = "star"
      break;
    case "PublicEvent":
      event.type = "public"
      break;
    case "CreateEvent":
      event.type = "new repo"
      break
    default:
      break;
  }
}

function mapEventRepo (event, name) {
  let repoOwner = event.repo.name.slice(0, event.repo.name.indexOf('/'))
  console.log(repoOwner)
  if (repoOwner === name) event.repo.name = event.repo.name.slice(event.repo.name.indexOf('/'))
}
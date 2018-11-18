import React, { Component } from "react";
import { Store } from "../store/index";

const store = new Store();

class ActivitiesView extends Component {
  state = {
    activities: {},
    usernames: []
  };

  async fetchActivities() {
    let _activities = [];
    let usernames = store.snapUserNames();
    _activities = await Promise.all(
      usernames.map(name => store.getUserActivities(name))
    );

    let activities = {};
    for (let i = 0; i < _activities.length; i++) {
      activities[usernames[i]] = _activities[i];
    }

    activities = normalizeActivities(activities);
    activities = flattenActivities(activities).sort((a, b) => {
      return new Date(b.time) - new Date(a.time);
    });
    this.setState({ activities });
  }

  fetchUserNames() {
    this.setState({
      usernames: store.snapUserNames()
    });
  }

  componentDidMount() {
    this.fetchUserNames();
    this.fetchActivities();
  }

  renderActivities() {
    let renderedEvents = [];
    let activities = this.state.activities || {};

    let event;
    for (let i = 0; i < activities.length; i++) {
      event = activities[i];
      let type = event.count > 1 ? event.type + "s" : event.type;
      renderedEvents.push(
        <div className="activity">
          <a href={event.url} target="_blank">
            <div>
              {event.user}: {event.count} {type}
            </div>
            <div>on {event.repo.name}</div>
          </a>
        </div>
      );
    }

    return renderedEvents;
  }

  render() {
    return <div className="activityContainer">{this.renderActivities()}</div>;
  }
}

export default ActivitiesView;

export function normalizeActivities(activities) {
  let finalActivities = {};
  for (let name of Object.keys(activities)) {
    let events = activities[name];

    let newEvents = [];
    let newEvent = {
      type: "",
      repo: {},
      count: 0,
      time: 0
    };

    let i = 0;
    while (i < events.length) {
      let event = events[i];
      mapEventType(event);
      mapEventRepo(event, name);
      if (
        newEvent &&
        newEvent.type === event.type &&
        newEvent.repo.name === event.repo.name
      ) {
        newEvent.count += event.payload.size || 1;
        console.log("same obj");
      } else {
        if (Boolean(newEvent.type)) newEvents.push(newEvent);
        newEvent = {
          type: event.type,
          repo: event.repo,
          count: event.payload.size || 1,
          time: event.created_at,
          url: `https://github.com/${event.repo.name}`
        };
      }
      i++;
    }
    if (!!newEvent.type) newEvents.push(newEvent);

    finalActivities[name] = newEvents;
  }
  return finalActivities;
}

function mapEventType(event) {
  switch (event.type) {
    case "PushEvent":
      event.type = "commit";
      break;
    case "IssuesEvent":
      event.type = "issue";
      break;
    case "WatchEvent":
      event.type = "star";
      break;
    case "PublicEvent":
      event.type = "public";
      break;
    case "CreateEvent":
      event.type = "new repo";
      break;
    case "MemberEvent":
      event.type = "new member";
      break;
    default:
      break;
  }
}

function mapEventRepo(event, name) {
  let repoOwner = event.repo.name.slice(0, event.repo.name.indexOf("/"));
  if (repoOwner === name)
    event.repo.name = event.repo.name.slice(event.repo.name.indexOf("/"));
}

function flattenActivities(activities) {
  let newActivities = [];
  let keys = Object.keys(activities);

  for (let i = 0; i < keys.length; i++) {
    let name = keys[i];
    for (let j = 0; j < activities[name].length; j++) {
      let event = activities[name][j];
      event.user = name;
      newActivities.push(event);
    }
  }
  return newActivities;
}

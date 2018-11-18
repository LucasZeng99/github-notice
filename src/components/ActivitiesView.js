import React, { Component } from "react";
import { Store } from "../store/index";
import {normalizeActivities, flattenActivities} from '../utils'

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
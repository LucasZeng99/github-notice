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


function normalizeActivities (acts) {

}
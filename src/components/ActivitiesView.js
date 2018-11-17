import React, { Component } from "react";
import { Store } from "../store/index";

const store = new Store();

class ActivitiesView extends Component {
  
  state = {activities: []}

  async fetchActivities () {
    let data = await store.getUserActivities('LucasZeng99')
    console.log(data)
    this.setState({activities: data})
  }

  componentDidMount () {
    this.fetchActivities()
  }

  renderActivities () {
    let activities = []
    for (let act of this.state.activities) {
      activities.push(<div>{act.id}</div>)
    }
    return activities
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
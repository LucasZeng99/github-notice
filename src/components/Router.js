import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Navbar from "./Navbar";
import ActivitiesView from "./ActivitiesView";
import SettingsView from "./SettingsView";
const Router = () => (
  <BrowserRouter>
    <div className="container" style={{ width: "300px", height: "400px" }}>
      <Navbar />
      <Switch>
        <Route path="/" component={ActivitiesView} exact />
        <Route path="/settings" component={SettingsView} />
      </Switch>
    </div>
  </BrowserRouter>
);
export default Router;

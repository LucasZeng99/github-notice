import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "../App.css";
import Navbar from "./Navbar";
import ActivitiesView from "./ActivitiesView";
import SettingsView from "./SettingsView";
const Router = () => (
  <BrowserRouter>
    <div className="router">
      <Navbar />
      <Switch>
        <Route path="/" component={ActivitiesView} exact />
        <Route path="/settings" component={SettingsView} />
      </Switch>
    </div>
  </BrowserRouter>
);
export default Router;

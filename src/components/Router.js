import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "../App.css";
import Navbar from "./Navbar";
import ActivitiesView from "./ActivitiesView";
import SettingsView from "./SettingsView";
const Router = () => {
  return (
    <BrowserRouter>
      <div className="router">
        <Navbar />
        <Switch>
<<<<<<< HEAD
          <Route path="/settings" component={SettingsView} />
          <Route path="/" component={ActivitiesView}/>
          
=======
          <Route path="/" component={ActivitiesView} exact />
          <Route path="/settings" component={SettingsView} exact />
>>>>>>> 13abb901072ca5c8d12134aa9865f7b8a0a27225
        </Switch>
      </div>
    </BrowserRouter>
  );
};
export default Router;

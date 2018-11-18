import React from "react";
import { BrowserRouter, Route, Switch} from "react-router-dom";
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
          <Route path="/settings" component={SettingsView} />
          <Route path="/" component={ActivitiesView}/>
          
        </Switch>
      </div>
    </BrowserRouter>
  );
};
export default Router;

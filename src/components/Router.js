import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import App from "../App";
import Navbar from "./Navbar";
import Settings from "./Settings";
const Router = () => (
  <BrowserRouter>
    <div>
      <Navbar />
      <Switch>
        <Route path="/" component={App} exact />
        <Route path="/settings" component={Settings} />
      </Switch>
    </div>
  </BrowserRouter>
);
export default Router;

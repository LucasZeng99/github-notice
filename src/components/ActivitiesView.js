import React, { Component } from "react";
import { Store } from "../store/index";

const store = new Store();

const ActivitiesView = () => {
  return (
    <div className="container" style={{ width: "300px", height: "400px" }}>
      Activities
    </div>
  );
};

export default ActivitiesView;

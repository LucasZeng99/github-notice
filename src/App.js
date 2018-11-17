import React, { Component } from "react";
import axios from "axios";
import Activities from "./components/Activities";

class App extends Component {
  state = { data: undefined };

  componentDidMount = async () => {
    const data = await axios.get(
      "https://api.github.com/repos/kdvuong/pokedex"
    );
    console.log(data);
    this.setState({ data: data.data });
  };

  render() {
    return (
      <div className="container">
        <Activities />
      </div>
    );
  }
}

export default App;

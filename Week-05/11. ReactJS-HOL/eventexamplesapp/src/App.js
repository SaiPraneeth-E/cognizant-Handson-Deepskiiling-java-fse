import React, { Component } from "react";
import CurrencyConvertor from "./CurrencyConverter";

class App extends Component {

  constructor() {
    super();

    this.state = {
      count: 0
    };
  }

  increment = () => {
    this.setState({
      count: this.state.count + 1
    });
  };

  decrement = () => {
    this.setState({
      count: this.state.count - 1
    });
  };

  sayHello = () => {
    alert("Hello! This is a static message.");
  };

  incrementAndHello = () => {
    this.increment();
    this.sayHello();
  };

  sayWelcome = (msg) => {
    alert(msg);
  };

  onPress = () => {
    alert("I was clicked");
  };

  render() {

    return (
     
      <div>
         <h2>Counter: {this.state.count}</h2>
        <button onClick={this.incrementAndHello}>
          Increment
        </button>

        <br /><br />

        <button onClick={this.decrement}>
          Decrement
        </button>

        <br /><br />

        <button onClick={() => this.sayWelcome("Welcome")}>
          Say welcome
        </button>

        <br /><br />

        <button onClick={this.onPress}>
          Click on me
        </button>

        <br /><br />

        <CurrencyConvertor />

      </div>

    );

  }

}

export default App;
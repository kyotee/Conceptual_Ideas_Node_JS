import React, { Component } from 'react';
import './App.scss';

class App extends Component {
  // Initialize state
  state = { test: "" }

  // Fetch passwords after first mount
  componentDidMount() {
    this.getPasswords();
  }

  getPasswords = () => {
    // Get the passwords and store them in state
    fetch('/api/test')
      .then(res => res.text())
      .then(res => this.setState({ test: res }))
      .catch(err => err);
  }

  render() {
    const { test } = this.state;

    return (
      <div className="App">
        {test}
        <p>Test Component</p>
        <button
          className="more"
          onClick={this.getPasswords}>
          Try Again?
        </button>
      </div>
    );
  }
}

export default App;

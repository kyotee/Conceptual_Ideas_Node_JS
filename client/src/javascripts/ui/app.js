import React, { Component } from 'react';
import logo from "../../images/logo.svg";
import "../../stylesheets/App.css";

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
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">{test}</p>
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

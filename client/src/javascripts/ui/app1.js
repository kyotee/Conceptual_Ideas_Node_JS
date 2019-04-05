import React, { Component } from "react";

class App1 extends Component {
	state = { testdb: "" }

    // Fetch passwords after first mount
    componentDidMount() {
        this.getTestDb();
    }

    getTestDb = () => {
        // Get the passwords and store them in state
        fetch('/api/testdb')
          .then(res => res.text())
          .then(res => this.setState({ testdb: res }))
          .catch(err => err);
    }

    render() {
    	const { testdb } = this.state;

        return (
            <div className="App">
                <p>other compoment</p>
                <p>{testdb}</p>
            </div>
        );
    }
}

export default App1;

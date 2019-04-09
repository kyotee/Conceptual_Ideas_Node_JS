import React, { Component } from "react";
import "../../stylesheets/static_pages.scss";

class About extends Component {
    render() {
        return (
            <div>
                <div class="app-title-space">
                    <div class="app-titles">
                        <div id="idea-icon-title"></div>
                        <p class="app-title">About</p>
                    </div>
                </div>

                <p class="static-page-text">Associated web based application serves as learning of various software libraries, frameworks, and other technologies with use of (and in addition to learning as well) Ruby on Rails. Intent for learning is related to personal interests. Note that development targets application use with Chrome Browser.</p>
            </div>
        );
    }
}

export default About;

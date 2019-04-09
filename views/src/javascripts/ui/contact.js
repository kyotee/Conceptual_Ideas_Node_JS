import React, { Component } from "react";
import "../../stylesheets/static_pages.scss";

class Contact extends Component {
    render() {
        return (
            <div>
				<div class="app-title-space">
					<div class="app-titles">
						<div id="idea-icon-title"></div>
						<p class="app-title">Contact</p>
					</div>
				</div>

				<p class="static-page-text">If any questions or concerns arise, feel free to contact my e-mail at <code id="email">tamkylet@sfu.ca</code></p>
            </div>
        );
    }
}

export default Contact;

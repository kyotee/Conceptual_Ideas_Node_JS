import './index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom';
import Notfound from './notfound';
import NavigationBar from './javascripts/ui/navigation_bar.js';
import UserApplications from './javascripts/ui/user_applications.js';
import About from './javascripts/ui/about.js';
import Contact from './javascripts/ui/contact.js';
import SignupSigninFormRedux from './javascripts/containers/signupSigninFormRedux.js';
import UserStoriesListRedux from './javascripts/containers/userStoriesListRedux.js';

ReactDOM.render(<NavigationBar/>, document.getElementById('nav'));

const routing = (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={UserApplications} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route
          path='/signup'
          render={(props) => <SignupSigninFormRedux {...props} formType={"Sign up"} />}
        />
        <Route
          path='/login'
          render={(props) => <SignupSigninFormRedux {...props} formType={"Sign in"} />}
        />
        <Route path="/user_stories" component={UserStoriesListRedux} />
        <Route component={Notfound} />
      </Switch>
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

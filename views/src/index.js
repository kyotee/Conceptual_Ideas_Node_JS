import './index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom';
import Notfound from './notfound';
import NavigationBar from './javascripts/ui/navigation_bar.js';
import UserApplications from './javascripts/ui/user_applications.js';
import About from './javascripts/ui/about.js';
import Contact from './javascripts/ui/contact.js';
import SignupSigninForm from './javascripts/ui/signup_signin_form.js';
import UserStoriesRedux from './javascripts/containers/userStoriesRedux.js';
import App from './javascripts/ui/app.js';
import App1 from './javascripts/ui/app1.js';
import CounterRedux from './javascripts/containers/counterRedux.js';

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
          render={(props) => <SignupSigninForm {...props} formType={"Sign up"} />}
        />
        <Route
          path='/login'
          render={(props) => <SignupSigninForm {...props} formType={"Sign in"} />}
        />
        <Route path="/user_stories" component={UserStoriesRedux} />
        <Route path="/app" component={App} />
        <Route path="/app1" component={App1} />
        <Route
          path='/app3'
          render={(props) => <CounterRedux {...props} counterNum={10} />}
        />
        <Route component={Notfound} />
      </Switch>
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

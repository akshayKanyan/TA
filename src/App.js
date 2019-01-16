import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from "./components";
import { HomePage } from "./HomePage";
import { LoginPage, SignUpPage } from "./LoginPage";

export default class App extends React.Component {
  render() {
    return (
      <div className="jumbotron">
        <div className="container">
          <div className="col-sm-8 col-sm-offset-2">
            <Router>
              <div>
                <PrivateRoute exact path="/" />
                <Route path="/login" component={LoginPage} />
                <Route path="/signup" component={SignUpPage} />
                <Route path="/page/:id" component={HomePage} />
              </div>
            </Router>
          </div>
        </div>
      </div>
    );
  }
}

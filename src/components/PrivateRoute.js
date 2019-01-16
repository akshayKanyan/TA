import React from "react";
import { Route, Redirect } from "react-router-dom";

export default ({ ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem("token")
        ? <Redirect to={{ pathname: "/page/1", state: { from: props.location } }} />
        : <Redirect to={{ pathname: "/login", state: { from: props.location } }} />}
  />
);

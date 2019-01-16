import React from "react";
import { userService } from "../services";
import { Link } from "react-router-dom";

export default class SignUpPage extends React.Component {
  constructor(props) {
    super(props);
    userService.logout();

    this.state = {
      username: "",
      password: "",
      submitted: false,
      loading: false,
      gender: "",
      toggleDropDown: false,
      error: ""
    };
  }

  toggleDropdown = e => {
    this.setState({ toggleDropDown: !this.state.toggleDropDown });
  };

  setGender = gender => {
    this.setState({ gender });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ submitted: true });
    const { username, password, returnUrl, gender } = this.state;
    // stop here if form is invalid
    if (!(username && password && gender)) {
      return;
    }

    this.setState({ loading: true });
    userService.createUser(username, password, gender).then(
      user => {
        if (user && user.errorMessage) {
          this.setState({ error: user.errorMessage, loading: false });
        } else {
          this.props.history.push({ pathname: "/login" });
        }
      },
      error => {
        this.setState({ error, loading: false });
      }
    );
  };

  render() {
    const { username, password, submitted, gender, loading, error } = this.state;
    return (
      <div className="col-md-6 col-md-offset-3">
        <h2>Sign Up</h2>
        <form name="form" onSubmit={this.handleSubmit}>
          <div className={"form-group" + (submitted && !username ? " has-error" : "")}>
            <label htmlFor="username">Enter : Username</label>
            <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} />
            {submitted && !username && <div className="help-block">Username is required</div>}
          </div>
          <div className={"form-group" + (submitted && !password ? " has-error" : "")}>
            <label htmlFor="password">Enter : Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={this.handleChange}
            />
            {submitted && !password && <div className="help-block">Password is required</div>}
          </div>

          <div
            className={"dropdown form-group" + (submitted && !gender ? " has-error" : "")}
            onClick={this.toggleDropdown}
          >
            <button className="btn btn-primary dropdown-toggle" type="button">
              {this.state.gender ? this.state.gender : "Select Gender"}
              <span className="caret" />
            </button>
            <ul className="dropdown-menu" style={{ display: this.state.toggleDropDown ? "block" : "none" }}>
              <li onClick={_ => this.setGender("MALE")}><a href="#">MALE</a></li>
              <li onClick={_ => this.setGender("FEMALE")}><a href="#">FEMALE</a></li>
            </ul>
            {submitted && !gender && <div className="help-block">Gender is required</div>}
          </div>

          <div className="form-group">
            <button className="btn btn-primary" disabled={loading}>
              create
            </button>
            {loading &&
              <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />}
          </div>
          {error && <div className={"alert alert-danger"}>{JSON.stringify(error)}</div>}
        </form>
      </div>
    );
  }
}

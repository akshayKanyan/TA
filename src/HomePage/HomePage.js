import React from "react";
import { Link } from "react-router-dom";

import { userService } from "../services";

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: {},
      currentPage: props.match.params.id || 1
    };
  }

  componentDidMount() {
    userService.getAllUsers(this.state.currentPage).then(data => this.setState({ data, loading: false }));
  }

  handleClick = number => {
    userService.getAllUsers(number).then(data => this.setState({ data, loading: false }));
    this.setState({
      currentPage: number,
      loading: true
    });
    this.props.history.push({ pathname: `/page/${number}` });
  };

  render() {
    const { data, loading } = this.state;
    let { data: { content = [], totalPages = 0 } = {} } = data;

    const renderUser = content.map((user, index) => {
      return (
        <li key={user.userName + index}>
          <span style={{ color: "red", fontWeight: "bold" }}>userName:</span> {user.userName}
          &nbsp;&nbsp;
          <span style={{ color: "green", fontWeight: "bold" }}>gender:</span> {user.gender}
        </li>
      );
    });

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i < totalPages; i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      let style = this.state.currentPage == number ? { color: "black", fontWeight: "bold" } : { color: "grey" };
      return (
        <li key={number} id={number} onClick={_ => this.handleClick(number)}>
          <span style={style}>{number}</span>
        </li>
      );
    });
    return (
      <div className="col-md-10 col-md-offset-3">
        <h1>Hi!</h1>
        <h3>Users List</h3>
        {loading
          ? <em>Loading users...</em>
          : <div>
              <ul>
                {renderUser}
              </ul>
              <ul id="page-numbers">
                {renderPageNumbers}
              </ul>
            </div>}
        <p>
          <Link to="/login">Logout</Link>
        </p>
      </div>
    );
  }
}

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isValidated: false, error: "" };
  }

  componentDidMount() {
    userService.verifyToken().then(data => {
      if (data.errorMessage) {
        this.setState({ error: true });
      } else {
        this.setState({ isValidated: true });
      }
    });
  }

  render() {
    return this.state.isValidated
      ? <MainPage {...this.props} />
      : <div className="col-md-10 col-md-offset-3">
          <h1>{this.state.error ? "You are not logged in" : "LOADING ...."}</h1>
          <p>
            <Link to="/login">Click here to login</Link>
          </p>
        </div>;
  }
}

export { HomePage };

import "./App.css";
import React, { Component } from "react";
import styled from "styled-components";
import Home from "./containers/Home/Home";
import Navbar from "./components/UI/Navbar/Navbar";
import Sidebar from "./components/UI/SideBar/Sidebar";
import Backdrop from "./components/UI/Backdrop/Backdrop";
import SignUp from "./containers/Auth/SignUp/SignUp";
import Logout from "./containers/Auth/Logout/Logout";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./containers/Auth/Login/Login";
import NoteDisplayer from "./components/NoteDisplayer/NoteDisplayer";

class App extends Component {
  state = {
    openSideBar: false,
    openBackDrop: false,
    login: true,
  };

  loginClicked = () => {
    this.setState({ login: true });
  };

  clickToggleHandler = () => {
    const currentStatu = this.state.openSideBar;
    const currenStatauTolbar = this.state.openSideBar;
    this.setState({
      openSideBar: !currentStatu,
      openBackDrop: !currenStatauTolbar,
    });
  };

  hideBackDrop = () => {
    this.setState({ openBackDrop: false });
  };

  render() {
    return (
      <Router>
        {this.state.login ? (
          <div>
            <Backdrop
              show={this.state.openBackDrop}
              click={this.clickToggleHandler}
            />
            <Navbar clickToggle={this.clickToggleHandler} />
            <Sidebar open={this.state.openSideBar} />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/note" component={NoteDisplayer} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={SignUp} />
              <Route path="/logout" component={Logout} />
              <Redirect to="/" />
            </Switch>
          </div>
        ) : (
          <Login click={this.loginClicked} />
        )}
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
  };
};
export default connect(mapStateToProps)(App);

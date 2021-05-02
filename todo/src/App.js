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
import * as actions from "./store/actions/index";
import Loading from "./components/UI/Loading/Loading";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./containers/Auth/Login/Login";
import NoteDisplayer from "./components/NoteDisplayer/NoteDisplayer";
import TemporaryArea from "./components/TemporaryArea/TemporaryArea";

class App extends Component {
  state = {
    openSideBar: false,
    openBackDrop: false,
    login: true,
    userId: null,
    loading: true,
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

  componentDidMount() {
    this.checkLocalPath();
  }

  checkLocalPath = () => {
    if (localStorage.getItem("idToken")) {
      const idToken = localStorage.getItem("idToken");
      const userId = localStorage.getItem("userId");
      const email = localStorage.getItem("email");
      const expires = localStorage.getItem("expires");
      const timeValidity = new Date(expires);
      const currentDate = new Date();
      if (currentDate < timeValidity) {
        this.props.onAuth(idToken, userId, email);
      } else {
        this.props.onLogOut();
      }
    }
  };

  render() {
    return (
      <Router>
        <div>
          <Backdrop
            show={this.state.openBackDrop}
            click={this.clickToggleHandler}
          />
          <Navbar clickToggle={this.clickToggleHandler} />
          <Sidebar open={this.state.openSideBar} />
          <Switch>
            <Route exact path="/loading" component={TemporaryArea} />
            <Route exact path="/home" component={Home} />
            <Route path="/note" component={NoteDisplayer} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <Route path="/logout" component={Logout} />
            {this.props.isAuth ? (
              <Redirect to="/loading" />
            ) : (
              <Redirect to="/login" />
            )}
          </Switch> 
          {/* <NoteDisplayer /> */}
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
    notes: state.note.notesList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (idToken, idUser, email) =>
      dispatch(actions.authSuccess(idToken, idUser, email)),
    onLogOut: () => dispatch(actions.logOut()),
    getNotes: () => dispatch(actions.getNotes()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

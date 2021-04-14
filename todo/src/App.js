import "./App.css";
import React, { Component } from "react";
import styled from "styled-components";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/SideBar/Sidebar";
import Backdrop from "./components/Backdrop/Backdrop";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./components/Login/Loginn";
import NoteDisplayer from "./components/NoteDisplayer/NoteDisplayer";

class App extends Component {
  state = {
    openSideBar: false,
    openBackDrop: false,
    login: true,
  };

  loginClicked = () => {
    // console.log("Login Cliked ")
    const login = this.state.login;
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
          <Container>
            <Backdrop
              show={this.state.openBackDrop}
              click={this.clickToggleHandler}
            />
            <Navbar clickToggle={this.clickToggleHandler} />
            <Sidebar open={this.state.openSideBar} />
            <Switch>
              <Route exact path="/" component={Home} />

              <Route path="/login" component={Login}/>

              <Route path="/note/:id" component={NoteDisplayer}/>
            </Switch>
          </Container>
        ) : (
          <Login click={this.loginClicked} />
        )}
      </Router>
    );
  }
}

export default App;

const Container = styled.div`
  background-color: #fff;
`;

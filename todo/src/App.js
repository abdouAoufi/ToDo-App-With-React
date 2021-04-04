import "./App.css";
import React, { Component } from "react";
import styled from "styled-components";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/SideBar/Sidebar";
import Backdrop from "./components/Backdrop/Backdrop";

class App extends Component {
  state = {
    openSideBar: false,
    openBackDrop: false,
  };
  clickToggleHandler = () => {
    const currentStatu = this.state.openSideBar;
    const currenStatauTolbar = this.state.openSideBar;
    this.setState({ openSideBar: !currentStatu  , openBackDrop : !currenStatauTolbar});
  };

  hideBackDrop = () => {
    this.setState({ openBackDrop: false });
  };
  render() {
    return (
      <Container>
        <Backdrop show={this.state.openBackDrop} click={this.clickToggleHandler}/>
        <Navbar clickToggle={this.clickToggleHandler} />
        <Sidebar open={this.state.openSideBar} />
        <Home />
      </Container>
    );
  }
}

export default App;

const Container = styled.div``;

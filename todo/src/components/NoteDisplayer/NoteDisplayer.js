import React, { Component } from "react";
import axios from "axios";
import Loading from "../UI/Loading/Loading";
import "./NoteDisplayer.css";
import {Redirect} from "react-router-dom"
import Backdrop from "../UI/Backdrop/Backdrop";
import CreateNotePage from "../CreateNotePage/CreateNotePage";
import { connect } from "react-redux";
class NoteDisplayer extends Component {
  state = {
    title: "",
    body: "",
    getData: false,
    showBackdrop: true,
    note : null
  };

  componentDidMount = () => {
   
  }

  onClickBackDrop = () => {
    this.props.history.replace("/");
  }

  render() {
    let notePage = null;
    notePage = (
      <CreateNotePage />
    );
    return (
      <Backdrop
      show={this.state.showBackdrop}
      click={this.onClickBackDrop}
      >
        {/* {! this.props.isAuth ? <Redirect to="/" /> : null} */}
        {notePage}
      </Backdrop>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth : state.auth.isAuth 
  };
};

export default connect(mapStateToProps)(NoteDisplayer);

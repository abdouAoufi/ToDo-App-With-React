import React, { Component } from "react";
import axios from "axios";
import Loading from "../Loading/Loading";
import "./NoteDisplayer.css";
import Backdrop from "../Backdrop/Backdrop";
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


  onClickBackDrop = () => {
    this.props.history.replace("/");
  }

  render() {
    let notePage = null;
    notePage = (
      <CreateNotePage
      note={this.state.note}
      history={this.props.history}
      clickCancel={this.onClickBackDrop}
      />
    );
    return (
      <Backdrop
        show={this.state.showBackdrop}
        click={this.onClickBackDrop}
      >
        {notePage}
      </Backdrop>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    targetNote: state.clickedNote,
  };
};

export default connect(mapStateToProps)(NoteDisplayer);

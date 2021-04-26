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

  // componentDidMount() {
  //   const id = this.props.targetNote;
  //   if (this.props.targetNote) {
  //     this.getDataFromServer(id);
  //   } else {
  //     console.log("We dont have id here ");
  //   }
  // }

  // getDataFromServer = (id) => {
  //   axios
  //     .request("https://jsonplaceholder.typicode.com/comments/" + id)
  //     .then((response) => {
  //       console.log(response.data);
  //       this.setState({note : response.data})
  //     })
  //     .catch((error) => {
  //       // this.setState({ error: true });
  //     });
  // };

  onClickBackDrop = () => {
    this.props.history.replace("/");
  }

  render() {
    let notePage = null;
    notePage = (
      <CreateNotePage
      // style={this.state.style}
      // create={this.state.create}
      note={this.state.note}
      history={this.props.history}
      clickCancel={this.onClickBackDrop}
      // getTitle={this.getTitle}
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

import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import * as actions from "../../store/actions/index";
import Loading from "../UI/Loading/Loading";
import styled from "styled-components";

class TemporaryArea extends Component {
  componentDidMount() {
    this.getNotes();
  }

  getNotes = () => {
    const alternative =
      "https://todo-1ecae-default-rtdb.firebaseio.com/notes.json";
    axios
      .get(alternative)
      .then((response) => {
        let notes = [];
        for (let key in response.data) {
          notes.push({ id: key, data: response.data[key] });
        }
        console.log("getting data seccufully");
        this.props.getNotes();
        //   this.props.history.push("/home")
      })
      .catch((error) => {});
  };

  render() {
    if (this.props.notes) {
      if (this.props.notes.length > 0) {
        this.props.history.push("/home");
      }
    }
    return (
      <Container>
        <Loading style={{ margin: "auto" }} />
      </Container>
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
    getNotes: (userId, idToken) => dispatch(actions.getNotes(userId, idToken)),
    //   noteClicked: (id) => dispatch(setTargetNote(id)),
    //   onLogOut: () => dispatch(actions.logOut()),
    //   getNoteSuccess: (notes) => dispatch(actions.gettingNoteSuccess(notes)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TemporaryArea);

const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
`;

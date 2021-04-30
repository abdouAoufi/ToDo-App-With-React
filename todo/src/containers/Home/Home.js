import React, { Component } from "react";
import styled from "styled-components";
import CreateNote from "./CreateNote/CreataNote";
import Note from "./SingleNote/SingleNote";
import axios from "axios";
import Loading from "../../components/UI/Loading/Loading";
import Error from "../../components/UI/Error/Error";
import { connect } from "react-redux";
import { setTargetNote, getNotes } from "../../store/actions/index";
import * as actions from "../../store/actions/index";

class home extends Component {
  state = {
    test: "",
    getData: true,
    list: [],
    loading: true,
    isAuth: null,
  };
  colors = ["#f4fa9c", "#f4fa9c", "#facf5a"];

  getRandomColor = () => {
    let random = Math.floor(Math.random() * this.colors.length);
    return this.colors[random];
  };

  openCreatePageHandler = () => {
    this.props.history.replace("/note");
  };

  clickedNoteHandler = (id) => {
    this.props.noteClicked(id);
    this.props.history.push("/note");
  };

  render() {
    console.log(this.props.notes);
    let singleNote = null;
    if (this.props.notes) {
      singleNote = this.props.notes.map((note) => {
        return (
          <Note
            click={() => {
              this.clickedNoteHandler(note.id);
            }}
            key={note.id}
            color={"#feb062"}
            title={note.data.title.slice(0, 20)}
            content={note.data.body}
            date={note.data.date}
          />
        );
      });
    } else {
      this.props.history.replace("/");
    }

    return (
      <Container>
        <OuterContainer>
          <CreateNoteHolder>
            <CreateNote color={"#e2f3f5"} click={this.openCreatePageHandler} />
          </CreateNoteHolder>
          <InnerContainer>
            <Inside>{singleNote}</Inside>
          </InnerContainer>
        </OuterContainer>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    notes: state.note.notesList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getNotes: (userId, idToken) => dispatch(getNotes(userId, idToken)),
    noteClicked: (id) => dispatch(setTargetNote(id)),
    onLogOut: () => dispatch(actions.logOut()),
    getNoteSuccess: (notes) => dispatch(actions.gettingNoteSuccess(notes)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(home);

const Container = styled.div`
  margin-top: 32px;
  width: 100%;
  display: grid;
  place-items: center;
  align-items: center;
`;
const OuterContainer = styled.div`
  width: 100%;
`;
const InnerContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  padding: 1rem;
`;
const Inside = styled.div`
  width: 95%;
  display: grid;
  align-items: center;
  place-items: center;
  grid-row-gap: 32px;
  grid-column-gap: 16px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;

const CreateNoteHolder = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 12px;
`;

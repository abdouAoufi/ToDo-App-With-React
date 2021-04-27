import React, { Component } from "react";
import styled from "styled-components";
import CreateNote from "./CreateNote/CreataNote";
import Note from "./SingleNote/SingleNote";
import axios from "axios";
import Loading from "../../components/Loading/Loading";
import Error from "../Error/Error";
import { connect } from "react-redux";
import { setTargetNote, getNotes } from "../../store/actions/index";

class home extends Component {
  state = {
    getData: false,
    list: [],
    loading: true,
  };

  componentDidMount() {
    this.props.getNotes();
  }

  static getDerivedStateFromProps(props, state) {
    return { list: props.listOfNotes, loading: false };
  }

  colors = ["#f4fa9c", "#f4fa9c", "#facf5a"];

  getRandomColor = () => {
    let random = Math.floor(Math.random() * this.colors.length);
    return this.colors[random];
  };

  openCreatePageHandler = () => {
    this.props.noteClicked(null);
    this.props.history.replace("/note");
  };

  clickedNoteHandler = (id) => {
    this.props.noteClicked(id);
    this.props.history.push("/note");
  };

  render() {
    let singleNote = null;
    let info = null;
    let loading = <Loading style={{ margin: "auto" }} />;
    if (!this.props.loading) {
      loading = null;
      if (this.state.list.length > 0) {
        singleNote = this.state.list.reverse().map((note) => {
          return (
            <Note
              click={() => {
                this.clickedNoteHandler(note.id);
              }}
              key={note.id}
              color={this.getRandomColor()}
              title={note.data.title.slice(0, 20)}
              content={note.data.body}
              date={note.data.date}
            />
          );
        });
      } else {
        loading = (
          <h2 style={{ color: "salmon" }}>Please start adding some notes !</h2>
        );
      }
      info = (
        <OuterContainer>
          <CreateNoteHolder>
            <CreateNote color={"#e2f3f5"} click={this.openCreatePageHandler} />
          </CreateNoteHolder>
          <InnerContainer>
            <Inside>{singleNote}</Inside>
          </InnerContainer>
        </OuterContainer>
      );
    }
    if (this.props.error) {
      loading = <h3 style={{ color: "red" }}>{this.props.error.message}</h3>;
    }

    return (
      <Container>
        {info}
        {loading}
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    targetNote: state.targetNote,
    listOfNotes: state.notesList,
    error: state.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getNotes: () => dispatch(getNotes()),
    noteClicked: (id) => dispatch(setTargetNote(id)),
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

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
    getData: false,
    list: [],
    loading: true,
  };

  email = null;
  idToken = null;
  userId = null;
  expires = null;

  componentDidMount() {
    this.props.getNotes();
    this.checkLocalPath();
  }

  checkLocalPath = () => {
    this.idToken = localStorage.getItem("idToken");
    this.userId = localStorage.getItem("userId");
    this.email = localStorage.getItem("email");
    this.expires = localStorage.getItem("expires");
    const timeValidity = new Date(this.expires);
    if (this.idToken) {
      if (new Date() < timeValidity) {
        if (this.expires) {
          this.props.onAuth(this.idToken, this.userId, this.email);
        } else {
          this.props.onLogOut();
        }
      }
    }
  };

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
              color={"#feb062"}
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
      info = null ;
      loading = <Error message={this.props.error.message} pleaSeLogin={false} />;
    }
    if(!this.props.isAuth){
      info = null ;
      loading = <Error message={"please login "} pleaSeLogin={true} />;
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
    loading: state.note.loading,
    targetNote: state.note.targetNote,
    listOfNotes: state.note.notesList,
    error: state.note.error,
    isAuth : state.auth.isAuth ,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getNotes: () => dispatch(getNotes()),
    noteClicked: (id) => dispatch(setTargetNote(id)),
    onAuth: (idToken, idUser, email) =>
      dispatch(actions.authSuccess(idToken, idUser, email)),
    onLogOut: () => dispatch(actions.logOut()),
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

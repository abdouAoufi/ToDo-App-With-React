import React, { Component } from "react";
import styled from "styled-components";
import CreateNote from "./CreateNote/CreataNote";
import Note from "./SingleNote/SingleNote";
import Backdrop from "../Backdrop/Backdrop";
import CreateNotePage from "../CreateNotePage/CreateNotePage";
import axios from "axios";
import Loading from "../../components/Loading/Loading";
import Error from "../Error/Error";
import {connect} from "react-redux"
import {setTargetNote} from '../../store/actions/index'
import * as actions from "../../store/actions/actionTypes"

class home extends Component {
  state = {
    showBackdrop: true,
    showCreateNote: false,
    notesList: [],
    loading: true,
    error: false,
    targetNote : null,
    create: false,
    style : null
  };

  componentDidMount() {
    this.getDataFromServer(3);
  }

  getDataFromServer = (amount) => {
    axios
      .request("https://jsonplaceholder.typicode.com/comments/")
      .then((response) => {
        const listBE = response.data.splice(0, amount);
        let data = [];
        listBE.forEach((item) => {
          const singleItem = {
            id: item.id,
            title: item.name,
            body: item.body,
            date: "fake data ",
          };
          data.push(singleItem);
        });
        this.setState({ notesList: data, loading: false });
      })
      .catch((error) => {
        this.setState({ error: true });
      });
  };

  colors = ["#f4fa9c", "#f4fa9c", "#facf5a", "#fcb1b1", "#f3e9d2", "#88d498"];

  getRandomColor = () => {
    let random = Math.floor(Math.random() * this.colors.length);
    return this.colors[random];
  };

  openCreatePageHandler = () => {
    this.props.history.push("/note")
    this.props.noteClicked(null)
  };






  clickedNoteHandler = (id) => {
    this.props.noteClicked(id)
    this.props.history.push("/note")
  };

  notes = () =>
    this.state.notesList.map((note) => (
      <Note
        click={() => {
          this.clickedNoteHandler(note.id);
        }}
        color={"#EEEEEE"}
        title={note.title.slice(0, 20)}
        content={note.body}
        date={note.date}
      />
    ));
  render() {
    return (
      <Container>
        {this.state.loading ? (
          !this.state.error ? (
            <Loading />
          ) : (
            <Error />
          )
        ) : (
          <OuterContainer>
       
             <CreateNoteHolder>
              <CreateNote
                color={"#e2f3f5"}
                click={this.openCreatePageHandler}
              />
            </CreateNoteHolder>
            <InnerContainer>
              <Inside>{this.notes()}</Inside>
            </InnerContainer> 
          </OuterContainer>
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    test : state.test ,
    targetNote : state.targetNote,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    noteClicked : (id) => dispatch(setTargetNote(id)) ,
  }
}

export default connect(mapStateToProps , mapDispatchToProps )(home);






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

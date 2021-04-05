import React, { Component } from "react";
import styled from "styled-components";
import CreateNote from "./CreateNote/CreataNote";
import Note from "./SingleNote/SingleNote";
import Backdrop from "../Backdrop/Backdrop";
import CreateNotePage from "../CreateNotePage/CreateNotePage";
import axios from "axios";
import Loading from "../../components/Loading/Loading";
import Error from "../Error/Error"

class home extends Component {
  state = {
    showBackdrop: false,
    showCreateNote: false,
    notesList: [],
    loading: true,
    error: false,
  };

  componentDidMount() {
    this.getDataFromServer(12);
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
    const pageStatu = this.state.showBackdrop;
    this.setState({ showBackdrop: !pageStatu });
  };

  clickDone = (result) => {
    this.saveNotes(result);
    this.openCreatePageHandler();
  };

  clickCancel = () => {
    this.openCreatePageHandler();
  };

  saveNotes = ({title , body , date}) => {
    const currentData = this.state.notesList;
    const id = this.state.notesList.length + 1;
    const singleItem = {
      id: id,
      title: title,
      body: body,
      date: date,
    };
    currentData.splice(0, 0, singleItem);
    this.setState({ notesList: currentData });
  };

  clickedNoteHandler = (note) => {
    // console.log
    console.log(note)
  }

  notes = () =>
    this.state.notesList.map((note) => (
      <Note
        click={() => {this.clickedNoteHandler(note)}}
        color={this.getRandomColor()}
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
            <Loading style={{ textAlign: "center", "margin-top": "15rem" }} />
          ) : (
            <Error />
          )
        ) : (
          <div>
            <Backdrop
              show={this.state.showBackdrop}
              click={this.openCreatePageHandler}
            >
              <CreateNotePage
                clickDone={this.clickDone}
                clickCancel={this.clickCancel}
                getTitle={this.getTitle}
              />
            </Backdrop>
            <CreateNoteHolder>
              <CreateNote
                color={"#e2f3f5"}
                click={this.openCreatePageHandler}
              />
            </CreateNoteHolder>
            <InnerContainer>
              <Inside>{this.notes()}</Inside>
            </InnerContainer>
          </div>
        )}
      </Container>
    );
  }
}

export default home;

const Container = styled.div`
  margin-top: 80px;
  width: 100%;
  display: grid;
  place-items: center;
  align-items: center;
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

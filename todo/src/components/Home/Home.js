import React, { Component } from "react";
import styled from "styled-components";
import CreateNote from "./CreateNote/CreataNote";
import Note from "./SingleNote/SingleNote";
import Backdrop from "../Backdrop/Backdrop";
import CreateNotePage from "../CreateNotePage/CreateNotePage";
import axios from "axios";

class home extends Component {
  state = {
    showBackdrop: false,
    showCreateNote: false,
    notesList: [],
  };

  componentDidMount() {
    this.getDataFromServer();
  }

  getDataFromServer = () => {
    axios
      .request("https://jsonplaceholder.typicode.com/comments/")
      .then((response) => {
        const listBE = response.data.splice(0, 2);
        let data = [];
        listBE.forEach((item) => {
          const singleItem = {
            id: item.id,
            title: item.name,
            body: item.body,
          };
          data.push(singleItem);
        });
        this.setState({ notesList: data });
      })
      .catch((erro) => {
        console.log(erro);
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

  saveNotes = (info) => {
    const currentData = this.state.notesList;
    const id = this.state.notesList.length + 1;
    const singleItem = {
      id: id,
      title: info.title,
      body: info.body,
    };
    currentData.splice(0, 0, singleItem);
    this.setState({ notesList: currentData });
    console.log("Current state ", singleItem);
  };

  notes = () =>
    this.state.notesList.map((note) => (
      <Note
        color={this.getRandomColor()}
        title={note.title.slice(0, 20)}
        content={note.body}
      />
    ));
  render() {
    return (
      <Container>
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
          <CreateNote color={"#e2f3f5"} click={this.openCreatePageHandler} />
        </CreateNoteHolder>
        <InnerContainer>
          <Inside>{this.notes()}</Inside>
        </InnerContainer>
      </Container>
    );
  }
}

export default home;

const Container = styled.div`
  margin-top: 80px;
  width: 100%;
`;

const InnerContainer = styled.div`
  display: flex;
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

import React, { Component } from "react";
import styled from "styled-components";
import CreateNote from "./CreateNote/CreataNote";
import Note from "./SingleNote/SingleNote"
import HomeLayout from "./HomeLayout/HomeLayout";

class home extends Component {
  state = {};

  render() {
    return (
      <Container>
        {/* <Header>Getting started with our app ...</Header> */}
        <CreateNoteHolder>

        <CreateNote color="#e2f3f5" />
        </CreateNoteHolder>
        <InnerContainer>
          <Inside>
            
            <Note color="#f4fa9c"/>
            <Note color="#ffa45c"/>
            <Note color="#f4fa9c"/>
            <Note color="#f4fa9c"/>
            <Note color="#ffa45c"/>
            <Note color="#f4fa9c"/>
          </Inside>
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
  grid-template-columns: auto auto auto auto;
`;


const CreateNoteHolder = styled.div`
  width : 100%;
  display : flex;
  justify-content : center;
  margin-bottom : 12px;
`;

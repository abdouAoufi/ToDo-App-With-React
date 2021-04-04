import React, { Component } from "react";
import styled from "styled-components";
import CartMU from './CreateNote/CartMU';
import HomeLayout from './HomeLayout/HomeLayout'

class home extends Component {
  state = {};

  render() {
    return (
      <Container>
        <HomeLayout />
            
      </Container>
    );
  }
}

export default home ;

const Container = styled.div`
margin-top : 50px;
display : grid :
place-items: center;
border : 1px solid magenta;
`;
const Inside = styled.div``;
import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";

export default class Login extends Component {
  render() {
    return (
      <Container style={{ marginTop: "4rem" }}>
        <SectionOne>
          {/* <Logo></Logo> */}
          <TextContainer>
            <Heading>
              Welcome where to notes <br /> we make life easier .....
            </Heading>
            <ListOfFeatures>
              <Feature>Making notes ..</Feature>
              <Feature>Making notes ..</Feature>
              <Feature>Making notes ..</Feature>
              <Feature>Making notes ..</Feature>
            </ListOfFeatures>
          </TextContainer>
        </SectionOne>

        <SectionTwo>
          <LoginContainer>
            <EmailInput type="email" placeholder="Email"/>
            <PasswordInput type="password" placeholder="Password"/>

            <LoginBtn>Login</LoginBtn>

            <Text>Other way to login </Text>

            <OtherContainer>
              <Holder>Google</Holder>
              <Holder>Facebook</Holder>
              <Holder>Microsoft</Holder>
            </OtherContainer>
          </LoginContainer>
        </SectionTwo>
      </Container>
    );
  }
}

const Container = styled.div`
  font-family: "Nunito", sans-serif;
  display: flex;
  justify-content: space-between;
  height: 90vh;
  width: 100%;
  aligin-items: center;
  place-items: center;
  padding: 3rem;
`;

const SectionOne = styled.div`
  flex: 1.8;
  display: block;
`;
const Logo = styled.img`
  height: 50px;
`;
const TextContainer = styled.div``;
const Heading = styled.h2`
  font-weight: 700;
  margin-bottom : 2rem;
`;
const ListOfFeatures = styled.ul`
  list-style: none;
`;
const Feature = styled.li`
  font-size: 1.2rem;
  font-weight: 500;
  margin : 8px auto ;
  padding : 0 4px; 
`;
const SectionTwo = styled.div`
  border: 1px solid green;
  flex: 1.2;
`;
const LoginContainer = styled.div`
display : flex ;
flex-direction : column ;
align-items : center;
text-align : center;`;
const EmailInput = styled.input``;
const PasswordInput = styled.input``;
const LoginBtn = styled.button`
width : 50%;`;
const OtherContainer = styled.div``;
const Holder = styled.div``;
const Text = styled.p``;

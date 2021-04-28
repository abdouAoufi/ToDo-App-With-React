import React from "react";
import styled from "styled-components";
import errorPicture from "../../../assets/network.png";
import login from "../../../assets/login.png";

const Error = (props) => {
  let src = errorPicture ; 
  if(props.pleaSeLogin){
    src = login
  }
  return (
    <Container>
      <LoadingPic src={src} />
      <Content>{props.message}</Content>
    </Container>
  );
};

export default Error;

const Container = styled.div`
  margin-top: 14rem;
  display: flex;
  flex-direction: column;
  align-items : center; 
  justify-content: center;
`;
const LoadingPic = styled.img`
  width: 85px;
`;
const Content = styled.h4`
  margin-top: 18px;
  font-size : 2.0rem;
  font-weight : 500;
  color: #feb062;
  text-align: center;
`;

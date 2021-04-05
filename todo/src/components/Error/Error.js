import React from "react";
import styled from "styled-components";
import errorPicture from "../../assets/network.png";

const Error = ({ content }) => {
  return (
    <Container>
      <LoadingPic src={errorPicture} />
      <Content>Error Network ... !</Content>
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
  width: 70px;
`;
const Content = styled.p`
  margin-top: 12px;
  font-size : 1.4rem;
  font-weight : 500;
  color: #f85959;
  text-align: center;
`;

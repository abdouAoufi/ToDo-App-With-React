import React from "react";
import styled from "styled-components";

const SimpleCard = ({ title, content, color, date, click }) => {
  return (
    <Container style={{ backgroundColor: color }} onClick={click}>
      <InnerContainer>
        <ParentTop>
          <Title>{title}</Title>
        </ParentTop>
        <ParentMiddle>
          <Content>{content}</Content>
        </ParentMiddle>
        <ParentBottom>
          <DateInfo>{date}</DateInfo>
        </ParentBottom>
      </InnerContainer>
    </Container>
  );
};

export default SimpleCard;

const Container = styled.div`
  font-family: "Nunito", sans-serif;
  box-sizing: border-box;
  width: 260px;
  height: 160px;
  over-flow: hidden;
  min-width: 250px;
  min-height: 170px;
  border: none;
  display: grid;
  place-items: center;
  margin: auto;
  padding-right: 4px;
  padding-left: 4px;
  border-radius: 4px;
  cursor : pointer;
`;
const InnerContainer = styled.div`

  min-height: 140px;
  min-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  place-items: flex-start;
  justify-content: space-between;
  padding: 4px;
`;
const ParentTop = styled.div`
  flex: 0.15;
`;
const Title = styled.span`
  font-size: 1.2rem;
  font-weight: 700;
  color: #000000;
`;
const ParentMiddle = styled.div`
  flex:  0.7;
  width : 100%;

  max-height : 60px:
`;
const Content = styled.p`
  font-size: 0.85rem;
  width: 100%;
  color: #3e3636;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  flex: 0.7;
`;
const ParentBottom = styled.div`
  // border: 1px solid pink;
  margin-top: 6px;
  width: 100%;
  flex: 0.15;
  justify-content: flex-end;
  display: flex;
`;
const DateInfo = styled.span`
  font-size: 0.75rem;
  font-style: italic;
  color: #40514e;
`;

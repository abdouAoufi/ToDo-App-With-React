import React from "react";
import styled from "styled-components";
// import note from "../../../assets/post-it.png";

 const option = ({ icon, name }) => {
  return (
    <Container>
      <Icon src={icon} />
      <Name>{name}</Name>
    </Container>
  );
};

const Container = styled.div`

display : flex;
height : 50px;
align-items : center;
border-bottom  :1px solid #c5e3f6;
width : 100%;
padding : 0 0.75rem; 
`;

const Icon = styled.img`
  height: 30px;
  margin-right: 25px;
`;

const Name = styled.span`
font-size : 1rem;
font-weight: 500; `;


export default option ;
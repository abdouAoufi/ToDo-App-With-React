import React from "react";
import styled from "styled-components";

const Backdrop = (props) => {
  return (
    <Container
      style={{ visibility: props.show ? "visible" : "hidden" }}
      onClick={props.click}
    >
      {props.children}
    </Container>
  );
};

export default Backdrop;

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  display: grid;
  place-items: center;
  align-items: center;
  z-index: 20;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.25);
`;

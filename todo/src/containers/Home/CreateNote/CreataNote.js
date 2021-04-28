import React from "react";
import styled from "styled-components";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import ImageIcon from "@material-ui/icons/Image";

const SimpleCard = (props) => {
  return (
    <Holder onClick={props.click} style={{ backgroundColor: props.color }}>
      <Heading>Create notes here ...</Heading>
      <InnerHolder>
        <CheckBoxIcon style={{ marginRight: 12 }} />
        <ImageIcon />
      </InnerHolder>
    </Holder>
  );
};

export default SimpleCard;

const Holder = styled.div`
  cursor: pointer;
  height: auto;
  width: 430px;
  border-radius: 5px;
  box-shadow: 0px 0px 3px #c4c4c4;
  display: flex;
  place-items : center;
  align-items: center;
  padding: 12px 16px;
  justify-content: space-between;
`;

const Heading = styled.h5`
  font-size: 16px;
  font-weight: 400;
`;

const InnerHolder = styled.div`
  display: flex;
`;

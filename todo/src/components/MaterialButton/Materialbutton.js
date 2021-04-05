import React from "react";
import Button from "@material-ui/core/Button";

export default function ContainedButtons({ name  , type , color , style , click}) {
  return (
    <Button variant={type} color={color} style={style} onClick={click}>
      {name}
    </Button>
  );
}

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import CartMU from "../CreateNote/CartMU";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width : "auto",
    border : "1px solid green",
    margin : "auto"
  },

}));

export default function NestedGrid() {
  const classes = useStyles();

  function FormRow() {
    return (
      <React.Fragment>
        <Grid item xs={3}>
          <CartMU color="#c5e3f6" />
        </Grid>
        <Grid item xs={3}>
          <CartMU color="#c5e3f6" />
        </Grid>
        <Grid item xs={3}>
          <CartMU color="#c5e3f6" />
        </Grid>

        <Grid item xs={3}>
          <CartMU color="#c5e3f6" />
        </Grid>

        
      </React.Fragment>
    );
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid container item xs={10} spacing={5}>
          <FormRow />
        </Grid>
        <Grid container item xs={10} spacing={5}>
          <FormRow />
        </Grid>
        <Grid container item xs={10} spacing={5}>
          <FormRow />
        </Grid>
      </Grid>
    </div>
  );
}

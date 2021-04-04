import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';



const  SimpleCard = (props) =>  {
      const useStyles = makeStyles({
            root: {
                  padding : 0,
              width: 275,
              backgroundColor :(props.color),
            },
            bullet: {
              display: 'inline-block',
              margin: '0 2px',
              transform: 'scale(0.8)',
            },
            title: {
              fontSize: 16,
              marginBottom : "6px",
            },
            bodyContent : {
                  fontSize : "12px",
                  marginTop : "2px",
                  marginBottom : 20
            },
            date : {
                  fontSize : 13,
                  margin : 0
            },
            pos: {
              marginBottom: 12,
            },
          });
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
     
        <Typography variant="h5" component="h2" className={classes.title}>
          Create notes 
        </Typography>
       
        <Typography  component="p" color="textSecondary" className={classes.bodyContent}>
         You can create notes <br />
         todo and more ...
        </Typography>

        <Typography component="p" color="textSecondary" className={classes.date}>
            Last edit 21-03-2021 23:14
        </Typography>
      </CardContent>
  
    </Card>
  );
}

export default SimpleCard ;

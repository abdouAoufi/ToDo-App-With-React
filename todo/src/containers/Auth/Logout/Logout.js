import { Redirect } from "react-router"
import {connect} from "react-redux"
import * as actions from "../../../store/actions/index"
import React, { Component } from 'react';



 class Logout extends Component {
componentDidMount(){
   this.props.onLogOut();
}

   render() {
      return (
         <div>
            <Redirect to="/" /> 
         </div>
      )
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
      onLogOut : () => dispatch(actions.logOut())
   }
}

export default connect(null , mapDispatchToProps)(Logout)
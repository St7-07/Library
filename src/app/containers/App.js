import React from "react";
import {connect} from "react-redux"

import { User } from "../components/User";
import { Main } from "../components/Main";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";

import { Content } from "../components/Content";
import {setName} from "../actions/userActions";

 class App extends React.Component { 

    render() {
        return (
        <div className="container-flow">
            <NavBar/>
            <Content/>
            <Footer/>
        </div>
        );
    }
} 

// <Main changerUsername={() => this.props.setName("Anna")}/>
// User username={this.props.user.name}/>

const mapStateToProps = (state) => {
   return {
       user: state.userReducer,
   };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setName: (name) => {
        dispatch(setName(name)); 
        } , 
        setAge: (age) => {
            dispatch(setAge(age)); 
        }
    };
 };

export default connect(mapStateToProps,mapDispatchToProps)(App);



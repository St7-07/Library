import React from "react";
import "../styles/LogIn.css";

import axios from 'axios';

import { Button } from "./Button";

export default class LogIn extends React.Component {

    constructor(props) {
        super();
    }

    render() {

        let logInHtml = (
            <div className="divLogIn container-fluid" id="logIn">
                <div className="row logoDiv">

                    <div className="col-xs-12 col-md-offset-4">
                        <div className="logo">
                            <h1><a><img src="../images/BRGlogo.png" alt="" /></a></h1>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="buttonDiv col-xs-6 col-md-4 col-md-offset-4">
                        <Button buttonType={"administrator"} hideLogIn={this.hideLogIn.bind(this)} />
                        <Button buttonType={"normalUser"} hideLogIn={this.hideLogIn.bind(this)} />
                        <label id="errorMessage" style={{ display: "none", color: "red" }}>Contraseña o nombre de usuario incorrecto trate de nuevo!</label>
                    </div>
                </div>
            </div>
        );


        return logInHtml;
    }

    hideLogIn(type) {
        let username = "";
        let password = "";
        
        if(document.getElementById("user").value == ""){
            username = "admin";
            password = document.getElementById("passwordAdmin").value;
        } else {
            username = document.getElementById("user").value;
            password = document.getElementById("passwordUser").value;
        }

        axios.post('http://localhost:8080/users/validate', {
            username: username,
            password: password
        }).then( (response) => {
           console.log(response.data);
           if(response.data.valid){
            $("#logIn").slideUp("slow", () => {
                console.log(type);
                switch (type) {
                    case "Administrator":
                        console.log("Administrator");
                        this.props.setType(type, "admin");
                        break;
                    case "NormalUser":
                        console.log("normalUser");
                        this.props.setType(type, username);
                        break;
                    default:
                        break;
                }
            });
           }else{
            $("#errorMessage").slideDown("slow");
           }
          })

    
    }
}


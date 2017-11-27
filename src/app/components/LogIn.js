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
                        <label className="labelError" id="errorMessage" >Contraseña o nombre de usuario incorrecto trate de nuevo!</label>
                        <label className="labelError" id="forgotPassword" onClick={() => this.showPuk()}>Se te olvido la contraseña? Recuperara!</label>
                        <div className="pukDiv">
                            <div className="pukDivContent">
                                <label>Ingrese el nombre de usuario y el codigo PUK para recuperar la contraseña</label><br />
                                <label>Nombre de usuario</label> <input type="text" className="form-control inputPUK" name="userName" id="userNamePuk" /><br />
                                <label>Codigo PUK</label> <input type="password" className="form-control inputPUK" name="password" id="passwordPuk" /><br />
                                <input type="submit" className="btn btn-primary" value="Recover" onClick={() => this.recoverPassword()} />
                                <label className="labelError" id="errorMessagePuk" >El PUK ingresado es incorrecto</label>
                                <label className="labelError" id="errorMessageUsername" >El usuario ingresado no existe en la base de datos</label>
                            </div>
                            <label className="labelPassword">La contraseña de la cuenta solicitada es: </label> <br />
                            <label className="labelPassword" id="labelPassword" ></label>
                        </div>
                    </div>
                </div>
            </div>
        );
        return logInHtml;
    }

    recoverPassword() {

        let userName = document.getElementById("userNamePuk").value;
        let puk = document.getElementById("passwordPuk").value;

        console.log(userName + " *** " + puk);
        if (puk == "123") {
            console.log("puk correcto");
            axios.post('http://localhost:8080/users/restorePassword', {
                username: userName,
            }).then((response) => {
                if (response.data.pass === "") {
                    $(".labelError").hide();
                    $("#errorMessageUsername").slideDown("slow");
                } else {
                    document.getElementById("labelPassword").innerHTML = response.data.pass;
                    $(".pukDivContent").hide();
                    $(".labelPassword").show();
                }
            })
        } else {
            $(".labelError").hide();
            $("#errorMessagePuk").slideDown("slow");

        }


    }

    showPuk() {
        $("#errorMessage").hide();
        $("#forgotPassword").hide();
        $(".pukDiv").slideDown("slow");
    }

    hideLogIn(type) {
        let username = "";
        let password = "";

        if (document.getElementById("user").value == "") {
            username = "admin";
            password = document.getElementById("passwordAdmin").value;
        } else {
            username = document.getElementById("user").value;
            password = document.getElementById("passwordUser").value;
        }

        axios.post('http://localhost:8080/users/validate', {
            username: username,
            password: password
        }).then((response) => {
            console.log(response.data);
            if (response.data.valid) {
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
            } else {
                $(".labelError").hide();
                $("#errorMessage").slideDown("slow");
                $("#forgotPassword").slideDown("slow");
            }
        })


    }
}


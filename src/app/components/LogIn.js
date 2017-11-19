import React from "react";
import "../styles/LogIn.css";

import { Button } from "./Button";

export default class LogIn extends React.Component {

    constructor(props) {
        super();
    }

    render() {

        let logInHtml = (
            <div className="divLogIn container-fluid" id="logIn">
                <div className="row logoDiv">
y
                    <div className="col-xs-12 col-md-offset-4">
                        <div className="logo">
                            <h1><a><img src="../images/BRGlogo.png" alt="" /></a></h1>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="buttonDiv col-xs-4 col-md-offset-4">
                        <Button buttonType={"administrator"} hideLogIn={this.hideLogIn.bind(this)} />
                        <Button buttonType={"normalUser"} hideLogIn={this.hideLogIn.bind(this)} />
                    </div>
                </div>
            </div>
        );


        return logInHtml;
    }

    hideLogIn(type, name) {

        $("#logIn").slideUp("slow", () => {
            console.log(type);
            switch (type) {
                case "Administrator":
                    console.log("Administrator");
                    this.props.setType(type, name);
                    break;
                case "NormalUser":
                    console.log("normalUser");
                    this.props.setType(type, name);
                    break;
                default:
                    break;
            }
        });
    }
}


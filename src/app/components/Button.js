import React from "react";
import "../styles/content.css";
import { SubMenu } from "./SubMenu";

export const Button = (props) => {

    let buttonHtml;
    let type = props.buttonType;

    switch (type) {
        case "Prestar":
            buttonHtml = (
                <div className="grid_1_of_3 images_1_of_3">
                    <a href="#"><img src="images/Prestar.png" onClick={() => props.clicked("loanForm")} /></a>
                    <h3>&nbsp; Prestar</h3>
                </div>
            );
            break;

        case "Devolver":
            buttonHtml = (
                <div className="grid_1_of_3 images_1_of_3">
                    <a href="#"><img src="images/devolver.png" onClick={() => props.clicked("returnForm")} /></a>
                    <h3>&nbsp;Devolver</h3>
                </div>
            );
            break;

        case "Renovar":
            buttonHtml = (
                <div className="grid_1_of_3 images_1_of_3">
                    <a href="#"><img src="images/renovar.png" onClick={() => props.clicked("renewForm")} /></a>
                    <h3>&nbsp;Renovar</h3>
                </div>
            );
            break;

        case "Moroso":
            buttonHtml = (
                <div className="grid_1_of_3 images_1_of_3">
                    <a href="#"><img src="images/morosos.jpg" onClick={() => props.clicked("tableDefaulters")} /></a>
                    <h3>&nbsp;Morosos</h3>
                </div>
            );
            break;

        case "Historial":
            buttonHtml = (
                <div className="grid_1_of_3 images_1_of_3">
                    <a href="#"><img src="images/historial.png" onClick={() => props.clicked("tableLoans")} /></a>
                    <h3>&nbsp;Historial</h3>
                </div>
            );
            break;

        case "listaAudio":
            buttonHtml = (
                <div className="grid_1_of_3 images_1_of_3">
                    <a href="#"><img src="images/listaAudioVisual.png" onClick={() => props.clicked("tableAV")} /></a>
                    <h3>&nbsp;Listar</h3>
                </div>
            );
            break;

        case "añadirSolicitante":
            buttonHtml = (
                <div className="grid_1_of_3 images_1_of_3">
                    <a href="#"><img src="images/añadirSolicitante.png" onClick={() => props.clicked("applicantForm")} /></a>
                    <h3>&nbsp;Añadir </h3>
                </div>
            );
            break;

        case "añadirAudio":
            buttonHtml = (
                <div className="grid_1_of_3 images_1_of_3">
                    <a href="#"><img src="images/añadirAudioVisual.png" onClick={() => props.clicked("añadirAudio")} /></a>
                    <h3>&nbsp;Añadir</h3>
                </div>
            );
            break;

        case "listarSolicitante":
            buttonHtml = (
                <div className="grid_1_of_3 images_1_of_3">
                    <a href="#"><img src="images/listarSolicitante.png" onClick={() => props.clicked("studentsTable")} /></a>
                    <h3>&nbsp;Listar</h3>
                </div>
            );
            break;

        case "eliminarAudio":
            buttonHtml = (
                <div className="grid_1_of_3 images_1_of_3">
                    <a href="#"><img src="images/eliminarAudioVisual.png" /></a>
                    <h3>&nbsp;Eliminar</h3>
                </div>
            );
            break;

        case "administrator":
            buttonHtml = (

                <div className="grid_1_of_4 images_1_of_4">
                    <div id="userForm">
                        <label>
                            Usuario:
                        <input type="text" className="form-control" name="user" id="user" />
                        </label>
                        <label>
                            Contraseña:
                        <input type="password" className="form-control" name="password" id="passwordUser" />
                        </label>


                        <input type="submit" onClick={() => props.hideLogIn("NormalUser")} className="btn btn-primary" value="Log In" />
                        <label onClick={() => showButton("normalUser")} id="rightArrow"><i class="fa fa-arrow-right" aria-hidden="true"></i></label>
                    </div>
                    <a id="administrator">  <img src="images/administrador1.0.png" onClick={() => hideButton("administrator")} />    <h3>&nbsp;&nbsp;Administrador</h3></a>

                </div>

            );
            break;

        case "normalUser":
            buttonHtml = (

                <div className="grid_1_of_4 images_1_of_4" >
                    <div id="administratorForm">
                        <label>
                            Contraseña:
                        <input className="form-control" type="password" name="passwordAdmin" id="passwordAdmin" />
                        </label>
                        <label id="leftArrow"  onClick={() => showButton("administrator")}><i class="fa fa-arrow-left" aria-hidden="true"></i></label>
                        <input type="submit" onClick={() => props.hideLogIn("Administrator")} className="btn btn-primary" value="Log In" />

                    </div>
                    <a id="normalUser"> <img src="images/normalUser2.0.png" onClick={() => hideButton("normalUser")} /><h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Usuario</h3></a>

                </div>


            );
            break;

        default:
            break;

    }
    return buttonHtml;
}

function showButton(e) {
    console.log(e);

    switch (e) {
        case "administrator":
            $("#administratorForm").fadeOut('slow', () => {
                $("#normalUser").fadeIn('slow');
            });
            console.log(e);
            break;
            
        case "normalUser":
            $("#userForm").fadeOut('slow', () => {
                $("#administrator").fadeIn('slow');
            });
            break;
        default:
            break;
    }

}


function hideButton(e) {
    switch (e) {
        case "administrator":
            $("#normalUser").fadeOut('slow', () => {
                $("#administratorForm").fadeIn('slow');
            });
            break;
        case "normalUser":
            $("#administrator").fadeOut('slow', () => {
                $("#userForm").fadeIn('slow');
            });
            break;

        default:
            break;
    }

}


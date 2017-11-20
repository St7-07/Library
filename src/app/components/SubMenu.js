import React from "react";
import "../styles/SubMenu.css";

import Table from "../components/Table"
import { Button } from "./Button";
import ApplicantForm from "../containers/ApplicantForm";

export const SubMenu = (props) => {

    let type = props.subMenuType;
    let subMenuHTML;

    switch (type) {
        case "Prestamos":
            subMenuHTML = (
                <div className="row">
                    <div className="row">
                        <ApplicantForm function="CREATE"/>
                    </div>
                    <div className="col-xs-12 col-md-offset-2">
                        <Button buttonType={"Prestar"} />
                        <Button buttonType={"Renovar"} />
                        <Button buttonType={"Devolver"} />
                    </div>
                </div>
            );
            break;

        case "Solicitantes":
            subMenuHTML = (
                <div className="row">
                    <div className="row">
                        <Table tableType="students"/>
                    </div>
                    <div className="col-xs-12 col-md-offset-2">
                        <Button buttonType={"añadirSolicitante"} />
                        <Button buttonType={"listarSolicitante"} />
                        <Button buttonType={"Moroso"} />
                    </div>
                </div>
            );
            break;

        case "Audiovisuales":
            subMenuHTML = (
                <div className="row">
                    <div className="col-xs-12 col-md-offset-2">
                        <Button buttonType={"añadirAudio"} />
                        <Button buttonType={"listaAudio"} />
                    </div>
                </div>
            );
            break;

        case "Historial":
            subMenuHTML = (
                <div className="row">
                    <div className="col-xs-12 col-md-offset-2">
                    </div>
                </div>
            );
            break;

        case "Estadisticas":
            subMenuHTML = (
                <div className="row">
                    <div className="col-xs-12 col-md-offset-2">

                    </div>
                </div>
            );
            break;

        default:
            break;
    }


    return subMenuHTML;
}
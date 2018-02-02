import React from "react";
import "../styles/SubMenu.css";
import { connect } from "react-redux";

import Table from "../components/Table"
import { Button } from "./Button";
import ApplicantForm from "../containers/ApplicantForm";

import {setSubcontent} from "../actions/sectionActions";

class SubMenu extends React.Component{

    render(){
        let type = this.props.subMenuType;
        let subMenuHTML;

        switch (type) {
            case "Prestamos":
                subMenuHTML = (
                    <div className="row">
                        <div className="row">
                        </div>
                        <div className="col-xs-10 col-md-offset-2">
                            <Button buttonType={"Prestar"} clicked={this.props.setSubcontent}/>
                            <Button buttonType={"Renovar"} clicked={this.props.setSubcontent}/>
                            <Button buttonType={"Devolver"} clicked={this.props.setSubcontent}/>
                        </div>
                    </div>
                );
                break;
    
            case "Solicitantes":
                subMenuHTML = (
                    <div className="row">
                        <div className="row">
                        </div>
                        <div className="col-xs-10 col-md-offset-2">
                            <Button buttonType={"añadirSolicitante"} clicked={this.props.setSubcontent}/>
                            <Button buttonType={"listarSolicitante"} clicked={this.props.setSubcontent}/>
                            <Button buttonType={"Moroso"} clicked={this.props.setSubcontent}/>
                        </div>
                    </div>
                );
                break;
    
            case "Audiovisuales":
                subMenuHTML = (
                    <div className="row">
                        <div className="col-xs-10 col-md-offset-2">
                            <Button buttonType={"añadirAudio"}  clicked={this.props.setSubcontent} />
                            <Button buttonType={"listaAudio"}  clicked={this.props.setSubcontent} />
                        </div>
                    </div>
                );
                break;
    
            case "Historial":
                subMenuHTML = (
                    <div className="row">
                        <div className="col-xs-10 col-md-offset-2">
                            <Button buttonType={"historial"}  clicked={this.props.setSubcontent} />
                            <Button buttonType={"pendientes"}  clicked={this.props.setSubcontent} />
                        </div>
                    </div>
                );
                break;
    
            case "Estadisticas":
                subMenuHTML = (
                    <div className="row">
                        <div className="col-xs-10 col-md-offset-2">
    
                        </div>
                    </div>
                );
                break;
    
            default:
                break;
        }

        return(
            <div>
            {subMenuHTML}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        sectionReducer: state.sectionReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setSubcontent: (type) => {
            dispatch(setSubcontent(type));
        }

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubMenu);
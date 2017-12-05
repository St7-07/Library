import React, { Component } from 'react';
import { setSubcontent } from "../actions/sectionActions";
import { connect } from "react-redux";
import axios from 'axios';

import { setApplicant } from "../actions/applicantActions";

class Modal extends Component {

    render() {

        let modal;

        switch (this.props.type) {
            case "students":
                modal =
                    <div className="list-group">
                        <a href="#" className="list-group-item"
                            onClick={() => this.props.setSubcontent("updateApplicant", this.props.selectedData, "STUDENT")}>Editar</a>
                        <a href="#" className="list-group-item"
                            onClick={() => this.clickHandler("delete", this.props.selectedData, this.props.refresh.bind(this), "students")}>Eliminar</a>
                        <a href="#" className="list-group-item"
                            onClick={() => this.clickHandler("showLoans", this.props.selectedData)}>Ver Morosidades</a>
                        <a href="#" className="list-group-item"
                            onClick={() => this.clickHandler("showDefaulters", this.props.selectedData)}>Ver Prestamos</a>
                    </div>
                break;
            case "clerks":
                modal =
                    <div className="list-group">
                        <a href="#" className="list-group-item"
                            onClick={() => this.props.setSubcontent("updateApplicant", this.props.selectedData, "CLERK")}>Editar</a>
                        <a href="#" className="list-group-item"
                            onClick={() => this.clickHandler("delete", this.props.selectedData, this.props.refresh.bind(this), "clerks")}>Eliminar</a>
                        <a href="#" className="list-group-item"
                            onClick={() => this.clickHandler("showLoans", this.props.selectedData)}>Ver Morosidades</a>
                        <a href="#" className="list-group-item"
                            onClick={() => this.clickHandler("showDefaulters", this.props.selectedData)}>Ver Prestamos</a>
                    </div>
                break;
            case "av_equipment":
                modal =
                    <div className="list-group">
                        <a href="#" className="list-group-item"
                            onClick={() => this.props.setSubcontent("updateEquipment", this.props.selectedData)}>Editar</a>
                        <a href="#" className="list-group-item"
                            onClick={() => this.clickHandler("delete", this.props.selectedData, this.props.refresh.bind(this), "av_equipment")}>Eliminar</a>
                    </div>
                break;
            case "loans":
                modal =
                    <div className="list-group">
                        <a href="#" className="list-group-item"
                            onClick={() => this.clickHandler("delete", this.props.selectedData, this.props.refresh.bind(this))}>Eliminar</a>
                        <a href="#" className="list-group-item"
                            onClick={() => this.clickHandler("applicantInfo", this.props.selectedData, this.props.refresh.bind(this))}>Ver info solicitante</a>
                    </div>
                break;
            case "defaulters":
                modal =
                    <div className="list-group">
                        <a href="#" className="list-group-item"
                            onClick={() => this.clickHandler("delete", this.props.selectedData, this.props.refresh.bind(this))}>Eliminar</a>
                        <a href="#" className="list-group-item"
                            onClick={() => this.clickHandler("applicantInfo", this.props.selectedData, this.props.refresh.bind(this))}>Ver info solicitante</a>
                    </div>
                break;
            case "userMenu":
                modal =
                    <div className="list-group">
                        <a href="#" className="list-group-item"
                            onClick={() => this.clickHandler("logOut")}>Cerrar Sesion</a>
                    </div>
                break;
        }
        return (
           
        
            <div className="modal fade bs-example-modal-sm" tabindex="-1" role="dialog"
                aria-labelledby="mySmallModalLabel" id={(this.props.type === "userMenu") ? "myModal2":"myModal"}>
                <div className="modal-dialog modal-sm" role="document">
                    <div className="modal-content">
                        {modal}
                    </div>
                </div>
            </div>
        )
    }

    clickHandler(optionSelected, selectedData, refresh, typeApplicant) {
        switch (optionSelected) {
            case "update":
                $('#myModal').modal('hide');

                // console.log(selectedData.name);

                break;
            case "delete":
                let id;
                switch (typeApplicant) {
                    case "students":
                        id = selectedData.studentId;
                        axios.delete('http://localhost:8080/applicants/student/' + id)
                            .then(response => {
                                console.log(response.data);
                                refresh();
                                $('#myModal').modal('hide');
                            });
                        break;
                    case "clerks":
                        id = selectedData.id;
                        axios.delete('http://localhost:8080/applicants/clerk/' + id)
                            .then(response => {
                                console.log(response.data);
                                refresh();
                                $('#myModal').modal('hide');
                            });
                        break;
                    case "av_equipment":
                        id = selectedData.barcode;
                        axios.delete('http://localhost:8080/av_equipments/av_equipment/' + id)
                            .then(response => {
                                console.log(response.data);
                                refresh();
                                $('#myModal').modal('hide');
                            });
                        break;
                    case "loans":

                        break;
                    case "defaulters":

                        break;
                    default:
                        break;
                }
            case "logOut":
                $('#myModal2').modal('hide');
                this.props.setType("none", "");
                break;
                break;
            case "showLoans":
                break;
            case "showDefaulters":
                break;
            case "applicantInfo":
                break;

        }
    }

};



const mapStateToProps = (state) => {
    return {
        sectionReducer: state.sectionReducer,
        applicantReducer: state.applicantReducer,
        logInReducer: state.logInReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setSubcontent: (type, selectedData, applicantType) => {
            $('#myModal').modal('hide');
            dispatch(setSubcontent(type));
            switch (type) {
                case 'updateApplicant':
                    console.log("tipo de applicant: ****" + type);
                    dispatch({ type: "CHANGE_APPLICANT_TYPE", payload: applicantType });
                    dispatch(setApplicant(type, selectedData));
                    break;
                case 'updateEquipment':
                    dispatch({ type: "SET_EQUIPMENT_INFO", payload: selectedData });
                    break;
            }
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);

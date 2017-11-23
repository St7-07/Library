import React from "react";
import {connect} from 'react-redux';

import {StudentForm} from '../components/StudentForm';
import {ClerkForm} from '../components/ClerkForm';

import "../styles/Form.css";

class ApplicantForm extends React.Component {

    constructor(props){
        super();
        this.state = {
            ...props.applicant
        }
    }

    render() {

        console.log("state local: *** " );
        console.log(this.state );
        return (
           
            <div className="formSpace">
                <div className="row">
                    <div className="btn-group">
                        <button type="button" className="btn btn-primary" onClick={() => this.props.onChangeApplicantType('STUDENT')}>Estudiante</button>
                        <button type="button" className="btn btn-primary" onClick={() => this.props.onChangeApplicantType('CLERK')}>Funcionario</button>
                    </div>
                    <br/>
                    <br/>
                    <br/>
                    <form action={(this.props.applicant.applicantType === 'STUDENT')?"/applicants/student":"/applicants/clerk"} 
                            method={(this.props.function === 'CREATE')?"POST":"PUT"}>
                        <div className="col-sm-2">
                            <div className="form-group">
                                <label for="identification">Cedula:</label>
                                <input type="text" className="form-control input-sm" id="identification" name="identification" />
                            </div>
                            <div className="form-group">
                                <label for="name">Nombre:</label>
                                <input type="text" className="form-control input-sm" id="name" name="name" />
                            </div>
                            <div className="form-group">
                                <label for="lastname">Apellidos:</label>
                                <input type="text" className="form-control input-sm" id="lastname" name="lastname"/>
                            </div>
                            <div className="form-group">
                                <label for="email">Email:</label>
                                <input type="email" className="form-control input-sm" id="email" name="email"/>
                            </div>
                            <div className="form-group">
                                <label for="tel">Telefono:</label>
                                <input type="text" className="form-control input-sm" id="tel" name="tel"/>
                            </div>
                            <div className="form-group">
                                <label for="cel">Celular:</label>
                                <input type="text" className="form-control input-sm" id="cel" name="cel"/>
                            </div>
                        </div>
                            
                        <div className="col-sm-2">
                                <div className="form-group">
                                    <label for="expireDate">Fecha Expiración:</label>
                                    <input type="date" className="form-control input-sm" id="expireDate" name="expireDate"/>
                                </div>
                                <div className="form-group">
                                    <label for="districtID">Distrito:</label>
                                    <select class="form-control" id="districtID" name="districtID">
                                        <option value='1'>San Roque</option>
                                        <option value='2'>Carrillos</option>
                                        <option value='3'>Tacares</option>
                                        <option value='4'>Los Angeles</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label for="signals">Otras Señales:</label>
                                    <input type="text" className="form-control input-sm" id="signals" name="signals"/>
                                </div>
                                <div className="form-group">
                                    <label for="locationID">Sede o Recinto:</label>
                                    <select class="form-control" id="locationID" name="locationID">
                                        <option value='1'>Tacares</option>
                                        <option value='2'>San Ramon</option>
                                        <option value='3'>Alajuela</option>
                                        <option value='4'>Rodrigo Facio</option>
                                    </select>
                                </div>
                                {/* Here goes the student or clerk form */}
                                { this.chooseApplicantForm() } 
                            <button type="submit" className="btn btn-primary">{(this.props.function === 'CREATE')?"Crear":"Actualizar"}</button>
                        </div>
                    </form>
            </div>
            </div>

        );
    }

    componentWillMount() {
     
    }

    chooseApplicantForm() {
        let formSection;
        if(this.props.applicant.applicantType === 'STUDENT') {
            formSection = (<StudentForm/>);
        } else {
            formSection = (<ClerkForm/>);
        }
        return formSection;
    }

}

const mapStateToProps = (state) => {
    return {
        applicant: state.applicantReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onChangeApplicantType: (applicantType) => dispatch({type: "CHANGE_APPLICANT_TYPE", payload: applicantType})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ApplicantForm);


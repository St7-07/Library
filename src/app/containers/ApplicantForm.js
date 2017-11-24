import React from "react";
import { connect } from 'react-redux';
import { Input, InputElement, SelectElement, InputChangedHandler } from '../components/FormsUI/Input';
import { StudentForm } from '../components/StudentForm';
import { ClerkForm } from '../components/ClerkForm';

import "../styles/Form.css";


class ApplicantForm extends React.Component {

    constructor(props){
        super();
        
        this.state = {
            ...props.applicant,
            form: {
                //cedula nombre , mail , telefono , celular
                identification: InputElement('text', 'Cedula', '', "identification", "Cedula"),
                name: InputElement('text', 'Nombre', '', 'name', "Nombre"),
                lastname: InputElement('text', 'Apellido', '', "lastname", "Apellido"),
                email: InputElement('email', 'Email', '', 'email', "email"),
                tel: InputElement('email', 'Telefono', '', "tel", "Telefono"),
                cel: InputElement('text', 'Celular', '', 'cel', "Celular"),

            },
            //fecha expiracion , distrito , otras senales , sede o recinto
            form2: {
                expireDate: InputElement('date', 'Fecha Expiracion', '', "expireDate", 'Fecha Expiracion'),
                ID_district: SelectElement([
                    { value: '1', displayValue: 'San Roque' },
                    { value: '2', displayValue: 'Carrillos' },
                    { value: '3', displayValue: 'Tacares' },
                    { value: '4', displayValue: 'Los Angeles' }]
                    , '', 'ID_district', "Distrito"),

                signals: InputElement('text', 'Otras senales', '', 'signals', "Otras Senales"),

                location: SelectElement([
                    { value: '1', displayValue: 'Tacares' },
                    { value: '2', displayValue: 'San Ramon' },
                    { value: '3', displayValue: 'Alajuela' },
                    { value: '4', displayValue: 'Rodrigo' }]
                    , '', 'location', "Recinto"),

            },
           
        }
    }

    render() {

        console.log("state local: *** ");
        console.log(this.state);

        const formElementsArray = [];
        for (let key in this.state.form) { //Creates an array to loop through an object attributes
            formElementsArray.push({
                id: key, //left side of attribute
                config: this.state.form[key] //right side attribute
            });
        }

        const formElementsArray2 = [];
        for (let key in this.state.form2) { //Creates an array to loop through an object attributes
            formElementsArray2.push({
                id: key, //left side of attribute
                config: this.state.form2[key] //right side attribute
            });
        }


        return (

            <div className="formSpace">
                <div className="row">
                    <div className="btn-group">
                        <button type="button" className="btn btn-primary" onClick={() => this.props.onChangeApplicantType('STUDENT')}>Estudiante</button>
                        <button type="button" className="btn btn-primary" onClick={() => this.props.onChangeApplicantType('CLERK')}>Funcionario</button>
                    </div>
                    <br />
                    <br />
                    <br />
                    <form action={(this.props.applicant.applicantType === 'STUDENT') ? "/applicants/student" : "/applicants/clerk"}
                        method={(this.props.function === 'CREATE') ? "POST" : "PUT"}>
                        {/* Here goes the student or clerk form */}
                        <div className="col-sm-2">
                            {formElementsArray.map(formElement => (
                                <div>

                                    <Input
                                        key={formElement.id}
                                        elementType={formElement.config.elementType}
                                        elementConfig={formElement.config.elementConfig}
                                        value={formElement.config.value}
                                        label={formElement.config.label}
                                        changed={(event) => this.setState({ form: InputChangedHandler(event, formElement.id, this.state) })}
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="col-sm-2">
                            {formElementsArray2.map(formElement => (
                                <div>
                                    <Input
                                        key={formElement.id}
                                        elementType={formElement.config.elementType}
                                        elementConfig={formElement.config.elementConfig}
                                        value={formElement.config.value}
                                        label={formElement.config.label}
                                        changed={(event) => this.setState({ form: InputChangedHandler(event, formElement.id, this.state) })}
                                    />
                                </div>
                            ))}
                            {/* this shit chooses the tipe if clerk or student */}
                             {this.chooseApplicantForm()}
                        </div>
                       
                        <button type="submit" className="btn btn-primary">{(this.props.function === 'CREATE') ? "Crear" : "Actualizar"}</button>
                       
                    </form>
                </div>
            </div>

        );
    }
     componentWillMount() { 
     }

    chooseApplicantForm() {
        let formSection;
        if (this.props.applicant.applicantType === 'STUDENT') {
            formSection = (<StudentForm />);
        } else {
            formSection = (<ClerkForm />);
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


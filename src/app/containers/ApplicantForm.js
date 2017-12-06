import React from "react";
import { connect } from 'react-redux';
import { Input, InputElement, SelectElement,  checkValidity, DateElement } from '../components/FormsUI/Input';
import { getActualTime } from '../components/util/util'
import { StudentForm } from '../components/StudentForm';
import { ClerkForm } from '../components/ClerkForm';
import { setSubcontent } from "../actions/sectionActions";
import axios from "axios";
import BootAlert from "../components/FormsUI/BootAlert";

import "../styles/Form.css";
var time = getActualTime()

class ApplicantForm extends React.Component {

    constructor(props) {
        super();
        this.stateInitialization(props);
        this.lastSection = "";
        console.log("entre");
    }

    getDataForSelects() {

        if (!this.state.loadedDistricts) {
            axios.get('http://localhost:8080/applicants/districts')
                .then(response => {
                    this.setState({ loadedDistricts: response.data });
                });
        }

        if (!this.state.loadedLocations) {
            axios.get('http://localhost:8080/applicants/locations')
                .then(response => {
                    this.setState({ loadedLocations: response.data });
                });
        }

    }

    populateSelects() {
        if (this.state.loadedDistricts
            && this.state.loadedLocations
            && (this.state.form2.ID_district.elementConfig.options.length == 1)) {


            let districs = this.state.loadedDistricts.map(district => {

                return {
                    value: district.id_district,
                    displayValue: district.DistrictName
                }
            });

            let locations = this.state.loadedLocations.map(location => {
                return {
                    value: location.id_location,
                    displayValue: location.locationName
                }
            });
            this.changeFormState(districs, locations);
        }
    }

    componentWillMount() {

    }

    renderData(props) {
        console.log(props);
        const UPDATE = (props.function == 'UPDATE') ? true : false;

        axios.get('http://localhost:8080/applicants/districts')
            .then(response => {
                this.setState({ loadedDistricts: response.data });
                let district = this.state.loadedDistricts.map(district => {
                    if (this.state.districtID === 0 && district.DistrictName === props.applicant.district) {
                        this.state.districtID = district.id_district;
                    }
                    return {
                        value: district.id_district,
                        displayValue: district.DistrictName
                    }
                });
                this.setState({
                    form2: {
                        ...this.state.form2,
                        ID_district: SelectElement(district, (UPDATE) ? this.state.districtID : '', 'district', 'Distrito')
                    }
                });
            });

        axios.get('http://localhost:8080/applicants/locations')
            .then(response => {
                this.setState({ loadedLocations: response.data });
                let locations = this.state.loadedLocations.map(location => {
                    if (this.state.locationID === 0 && location.locationName === props.applicant.location) {
                        this.state.locationID = location.id_location;
                    }
                    return {
                        value: location.id_location,
                        displayValue: location.locationName
                    }
                });
                this.setState({
                    form2: {
                        ...this.state.form2,
                        location: SelectElement(locations, (UPDATE) ? this.state.locationID : '', 'location', "Localidad")
                    }
                });
            });

    }

    changeFormState(districs, locations) {
        this.setState({
            form: {
                //cedula nombre , mail , telefono , celular
                identification: InputElement('text', 'Cedula', '', "identification", "Cedula",true, false, 10, 10,false,true),
                name: InputElement('text', 'Nombre', '', 'name', "Nombre",true, false, 2, 15,false),
                lastname: InputElement('text', 'Apellido', '', "lastname", "Apellido",true, false, 2, 15,false),
                email: InputElement('email', 'Email', '', 'email', "email",true, false, 5, 30,false),
                tel: InputElement('number', 'Telefono', '', "tel", "Telefono",true, false, 8, 12,false,true),
                cel: InputElement('text', 'Celular', '', 'cel', "Celular",true, false, 8, 12,false,true),
            },
            
            form2: {
                expireDate: DateElement('date', 'Fecha Expiracion', '', "expireDate", 'Fecha Expiracion', '2025-10-10', time),
                ID_district: SelectElement(districs, '', 'ID_district', "Distrito",true),
                signals: InputElement('text', 'Otras senales', '', 'signals', "Otras Senales",true, false, 5, 20,false),
                location: SelectElement(locations, '', 'location', "Recinto",true)
            }, formIsValid: false

        });

    }

    stateInitialization(props) {
        if (props.function === 'CREATE') {

            if (props.applicant.applicantType === 'STUDENT') {
                this.state = {
                    districtID: 0,
                    locationID: 0,
                    form: {
                        //cedula nombre , mail , telefono , celular
                        identification: InputElement('text', 'Cedula', '', "identification", "Cedula",true, false, 10, 10,false,true),
                        name: InputElement('text', 'Nombre', '', 'name', "Nombre",true, false, 2, 15,false),
                        lastname: InputElement('text', 'Apellido', '', "lastname", "Apellido",true, false, 2, 15,false),
                        email: InputElement('email', 'Email', '', 'email', "email",true, false, 5, 30,false),
                        tel: InputElement('text', 'Telefono', '', "tel", "Telefono",true, false, 8, 12,false,true),
                        cel: InputElement('text', 'Celular', '', 'cel', "Celular",true, false, 8, 12,false,true)
                    },
                    //fecha expiracion , distrito , otras senales , sede o recinto
                    form2: {
                        expireDate: DateElement('date', 'Fecha Expiracion', '', "expireDate", 'Fecha Expiracion', '2025-10-10',time),
                        ID_district: SelectElement([
                            { value: '1', displayValue: 'San Roque' },
                            { value: '2', displayValue: 'Carrillos' },
                            { value: '3', displayValue: 'Tacares' },
                            { value: '4', displayValue: 'Los Angeles' }]
                            , '', 'ID_district', "Distrito",true),

                        signals: InputElement('text', 'Otras senales', '', 'signals', "Otras Senales"),
                        location: SelectElement([
                            { value: '1', displayValue: 'Tacares' },
                            { value: '2', displayValue: 'San Ramon' },
                            { value: '3', displayValue: 'Alajuela' },
                            { value: '4', displayValue: 'Rodrigo' }]
                            , '', 'location', "Recinto",true),
                        career: InputElement('text', 'Carrera', '', "career", 'Carrera',true, false, 5, 20,false),
                        studentID: InputElement('text', 'Carnet', '', "studentId", 'Carnet Estudiante',true, false, 6, 6,false)

                    },
                    loadedDistricts: null,
                    loadedLocations: null,
                    formIsValid: false
                }
            } else {
                this.state = {
                    districtID: 0,
                    locationID: 0,
                    form: {
                        //cedula nombre , mail , telefono , celular
                        identification: InputElement('text', 'Cedula', '', "identification", "Cedula",true, false, 10, 10,false,true),
                        name: InputElement('text', 'Nombre', '', 'name', "Nombre",true, false, 2, 15,false),
                        lastname: InputElement('text', 'Apellido', '', "lastname", "Apellido",true, false, 2, 15,false),
                        email: InputElement('email', 'Email', '', 'email', "email",true, false, 5, 30,false),
                        tel: InputElement('text', 'Telefono', '', "tel", "Telefono",true, false, 8, 12,false,true),
                        cel: InputElement('text', 'Celular', '', 'cel', "Celular",true, false, 8, 12,false,true)

                    },
                    //fecha expiracion , distrito , otras senales , sede o recinto
                    form2: {
                        expireDate: DateElement('date', 'Fecha Expiracion', '', "expireDate", 'Fecha Expiracion', '2025-10-10', time),
                        ID_district: SelectElement([
                            { value: '1', displayValue: 'San Roque' },
                            { value: '2', displayValue: 'Carrillos' },
                            { value: '3', displayValue: 'Tacares' },
                            { value: '4', displayValue: 'Los Angeles' }]
                            , '', 'ID_district', "Distrito",true),

                        signals: InputElement('text', 'Otras senales', '', 'signals', "Otras Senales"),

                        location: SelectElement([
                            { value: '1', displayValue: 'Tacares' },
                            { value: '2', displayValue: 'San Ramon' },
                            { value: '3', displayValue: 'Alajuela' },
                            { value: '4', displayValue: 'Rodrigo' }]
                            , '', 'location', "Recinto",true),
                        department: InputElement('text', 'Departamento', '', "department", 'Departamento',true, false, 5, 20,false),
                        position: InputElement('text', 'Posicion', '', "position", 'Posicion',true, false, 5, 20,false)
                    },
                    loadedDistricts: null,
                    loadedLocations: null,
                    formIsValid: false
                }
            }

        } else {
            if (props.applicant.applicantType === 'STUDENT') {
                this.state = {
                    old: props.applicant.studentID,
                    districtID: 0,
                    locationID: 0,
                    form: {
                        //cedula nombre , mail , telefono , celular
                        identification: InputElement('text', 'Cedula', props.applicant.identification, 
                        "identification", "Cedula",true, false, 10, 10,false,true),
                        name: InputElement('text', 'Nombre', props.applicant.name, 'name', "Nombre",true, false, 2, 15,false),
                        lastname: InputElement('text', 'Apellido', props.applicant.lastname, "lastname", "Apellido",true, false, 2, 15,false),
                        email: InputElement('email', 'Email', props.applicant.email, 'email', "email",true, false, 5, 30,false),
                        tel: InputElement('text', 'Telefono', props.applicant.tel, "tel", "Telefono",true, false, 8, 12,false,true),
                        cel: InputElement('text', 'Celular', props.applicant.cel, 'cel', "Celular",true, false, 8, 12,false,true)

                    },
                    //fecha expiracion , distrito , otras senales , sede o recinto
                    form2: {
                        expireDate: DateElement('date', 'Fecha Expiracion', props.applicant.expireDate, "expireDate",
                            'Fecha Expiracion', '2025-10-10', getActualTime),
                        ID_district: SelectElement([
                            { value: '1', displayValue: 'San Roque' },
                            { value: '2', displayValue: 'Carrillos' },
                            { value: '3', displayValue: 'Tacares' },
                            { value: '4', displayValue: 'Los Angeles' }]
                            , '', 'ID_district', "Distrito",true),

                        signals: InputElement('text', 'Otras senales', '', 'signals', "Otras Senales"),

                        location: SelectElement([
                            { value: '1', displayValue: 'Tacares' },
                            { value: '2', displayValue: 'San Ramon' },
                            { value: '3', displayValue: 'Alajuela' },
                            { value: '4', displayValue: 'Rodrigo' }]
                            , '', 'location', "Recinto",true),
                        career: InputElement('text', 'Carrera', props.applicant.career, "career", 'Carrera',true,false,5,20),
                        studentID: InputElement('text', 'Carnet', props.applicant.studentID, "studentID", 'Carnet Estudiante',true,false,6,6,false)
                    },
                    loadedDistricts: null,
                    loadedLocations: null,
                    formIsValid: false
                }
            } else {
                this.state = {
                    old: props.applicant.identification,
                    districtID: 0,
                    locationID: 0,
                    form: {
                        //cedula nombre , mail , telefono , celular
                        identification: InputElement('text', 'Cedula', props.applicant.identification, 
                        "identification", "Cedula",true, false, 10, 10,false,true),
                        name: InputElement('text', 'Nombre', props.applicant.name, 'name', "Nombre",true, false, 2, 15,false),
                        lastname: InputElement('text', 'Apellido', props.applicant.lastname, "lastname", "Apellido",true, false, 2, 15,false),
                        email: InputElement('email', 'Email', props.applicant.email, 'email', "email",true, false, 5, 30,false),
                        tel: InputElement('text', 'Telefono', props.applicant.tel, "tel", "Telefono",true, false, 8, 12,false,true),
                        cel: InputElement('text', 'Celular', props.applicant.cel, 'cel', "Celular",true, false, 8, 12,false,true)

                    },
                    //fecha expiracion , distrito , otras senales , sede o recinto
                    form2: {
                        expireDate: DateElement('date', 'Fecha Expiracion', props.applicant.expireDate,
                            "expireDate", 'Fecha Expiracion', '2025-10-10', time),
                        ID_district: SelectElement([
                            { value: '1', displayValue: 'San Roque' },
                            { value: '2', displayValue: 'Carrillos' },
                            { value: '3', displayValue: 'Tacares' },
                            { value: '4', displayValue: 'Los Angeles' }]
                            , '', 'ID_district', "Distrito",true),

                        signals: InputElement('text', 'Otras senales', '', 'signals', "Otras Senales"),

                        location: SelectElement([
                            { value: '1', displayValue: 'Tacares' },
                            { value: '2', displayValue: 'San Ramon' },
                            { value: '3', displayValue: 'Alajuela' },
                            { value: '4', displayValue: 'Rodrigo' }]
                            , '', 'location', "Recinto",true),
                        department: InputElement('text', 'Departamento', props.applicant.department, "department", 'Departamento',true, false, 5, 20,false),
                        position: InputElement('text', 'Posicion', props.applicant.position, "position", 'Posicion',true, false, 5, 20,false)
                    },
                    loadedDistricts: null,
                    loadedLocations: null,
                    formIsValid: false
                }
            }
        }
        this.renderData(props)
    }

    resetFields() {
        this.setState({
            form: {
                ...this.state.form,
                barcode: InputElement('text', 'Nombre', ''
                    , "barcode", "Codigo Barras"),
                model: InputElement('text', 'Modelo', ''
                    , "model", "Modelo")
            }
        });
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in this.state.form) {
            formData[formElementIdentifier] = this.state.form[formElementIdentifier].value;
        }
        for (let formElementIdentifier in this.state.form2) {
            formData[formElementIdentifier] = this.state.form2[formElementIdentifier].value;
        }

        console.log(formData);
        let applicantType = ((this.props.applicant.applicantType === 'STUDENT') ? 'student' : 'clerk');
        if (this.props.function === "CREATE") {
            axios.post('http://localhost:8080/applicants/' + applicantType, formData)
                .then(response => {
                    document.getElementById('applicantAlert').hidden = false;
                    this.stateInitialization(this.props);
                });
        } else {
            console.log("old :****************    " + this.state.old);
            formData["old"] = this.state.old;
            axios.put('http://localhost:8080/applicants/' + applicantType, formData)
                .then(response => {
                    document.getElementById('applicantAlert').hidden = false;
                    this.resetFields();
                });
        }
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedForm =
            {
                ...this.state.form
            };
        const updatedFormElement =
            {
                ...updatedForm[inputIdentifier]
            };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedForm[inputIdentifier] = updatedFormElement;
      //  let formIsValid = true;

        // for (let inputIdentifier in updatedForm) {
        //     formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
        // }
        // console.log(updatedFormElement);
        console.log(updatedFormElement);
         this.setState({ form: updatedForm});
    }

    InputChangedHandlerForm2 = (event, inputIdentifier) => {
        const updatedForm = {
            ...this.state.form2
        }
        const updatedFormElement = {
            ...updatedForm[inputIdentifier]
        }
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedForm[inputIdentifier] = updatedFormElement;
        let formIsValid = true;

        for (let inputIdentifier in updatedForm) {
            formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
        }
        console.log(updatedFormElement);
        this.setState({ form2: updatedForm, formIsValid: formIsValid });
    }

    render() {

        if (this.lastSection != this.props.applicant.applicantType) {
            this.stateInitialization(this.props);
            this.lastSection = this.props.applicant.applicantType;
        }

        //  console.log("renderApp asdasdas");
        //  this.populateSelects();

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
                        <button disabled={(this.props.function === 'CREATE')?false:true} type="button" className="btn btn-primary" onClick={() => this.props.onChangeApplicantType('STUDENT')}>Estudiante</button>
                        <button disabled={(this.props.function === 'CREATE')?false:true} type="button" className="btn btn-primary" onClick={() => this.props.onChangeApplicantType('CLERK')}>Funcionario</button>
                    </div>
                    <br />
                    <br />
                    <br />
                    <form onSubmit={(event => this.onSubmitHandler(event))}>
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
                                        invalid={!formElement.config.valid}
                                        shouldValidate={formElement.config.validation}
                                        touched={formElement.config.touched}
                                        changed={(event) => this.inputChangedHandler(event, formElement.id)}
                                    // changed={(event) => this.setState({ form: InputChangedHandler(event, formElement.id, this.state) })}
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
                                        invalid={!formElement.config.valid}
                                        shouldValidate={formElement.config.validation}
                                        touched={formElement.config.touched}
                                        changed={(event) => this.InputChangedHandlerForm2(event, formElement.id)}
                                    />
                                </div>
                            ))}

                        </div>

                        <button disabled={(this.props.function === 'CREATE')?!this.state.formIsValid : this.state.formIsValid} type="submit" className="btn btn-primary">{(this.props.function === 'CREATE') ? "Crear" : "Actualizar"}</button>

                    </form>
                </div>
                <br />
                <BootAlert id='applicantAlert' title="Exito!" message="La operacion ha sido realizada." />
            </div>

        );
    }

}

const mapStateToProps = (state) => {
    return {
        applicant: state.applicantReducer,
        sectionReducer: state.sectionReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onChangeApplicantType: (applicantType) => {
            dispatch({ type: "CHANGE_APPLICANT_TYPE", payload: applicantType });
            dispatch(setSubcontent("applicantForm"));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ApplicantForm);


import React from "react";
import { connect } from 'react-redux';
import { Input, InputElement, SelectElement, InputChangedHandler, InputChangedHandlerForm2 } from '../components/FormsUI/Input';
import { StudentForm } from '../components/StudentForm';
import { ClerkForm } from '../components/ClerkForm';
import axios from "axios";

import "../styles/Form.css";


class ApplicantForm extends React.Component {

    constructor(props) {
        super();

        this.state = {
            form: {
                //cedula nombre , mail , telefono , celular
                identification: InputElement('text', 'Cedula', '', "identification", "Cedula"),
                name: InputElement('text', 'Nombre', '', 'name', "Nombre"),
                lastname: InputElement('text', 'Apellido', '', "lastname", "Apellido"),
                email: InputElement('email', 'Email', '', 'email', "email"),
                tel: InputElement('number', 'Telefono', '', "tel", "Telefono"),
                cel: InputElement('text', 'Celular', '', 'cel', "Celular"),
                category: SelectElement([
                    { value: '1', displayValue: 'toDeploy' },]
                    , '', 'category', "Categoria"),

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
            loadedDistricts: null,
            loadedLocations: null,
            loadedCategories: null,

        }
    }

    getDataForSelects() {
        if (!this.state.loadedCategories) {
            axios.get('http://localhost:8080/av_equipments/categories')
                .then(response => {
                    this.setState({ loadedCategories: response.data });
                });
        }
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
            && (this.state.form.category.elementConfig.options.length == 1)) {

            let categories = this.state.loadedCategories.map(category => {
             
                return {
                    value: category.id_category,
                    displayValue: category.category
                }
            });

            //problemas con el id
            let districs = this.state.loadedDistricts.map(district => {
                console.log("id category: " + district.id_district);
                return {
                    value: district.id_district,
                    displayValue: district.DistrictName
                }
            });

                //poblemas con el id
            let locations = this.state.loadedLocations.map(location => {
                return {
                    value: location.id_location,
                    displayValue: location.locationName
                }
            });
            this.changeFormState(categories,districs, locations);
        }
    }

    changeFormState(categories,districs, locations) {
        this.setState({
            form: {
                //cedula nombre , mail , telefono , celular
                identification: InputElement('text', 'Cedula', '', "identification", "Cedula"),
                name: InputElement('text', 'Nombre', '', 'name', "Nombre"),
                lastname: InputElement('text', 'Apellido', '', "lastname", "Apellido"),
                category: SelectElement(categories, '', 'category', 'Categoria'),
                email: InputElement('email', 'Email', '', 'email', "email"),
                tel: InputElement('number', 'Telefono', '', "tel", "Telefono"),
                cel: InputElement('text', 'Celular', '', 'cel', "Celular"),
            },
            form2: {
                expireDate: InputElement('date', 'Fecha Expiracion', '', "expireDate", 'Fecha Expiracion'),
                ID_district: SelectElement(districs, '', 'ID_district', "Distrito"),
                signals: InputElement('text', 'Otras senales', '', 'signals', "Otras Senales"),
                location: SelectElement(locations, '', 'location', "Recinto"),

            },
        });

    }

    componentDidMount() {
        this.getDataForSelects();
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in this.state.form) {
            formData[formElementIdentifier] = this.state.form[formElementIdentifier].value;
        }
        let applicantType = ((this.props.applicant.applicantType === 'STUDENT')?'student':'clerk');
        switch (this.props.function) {
            case 'CREATE':
                axios.post('http://localhost:8080/applicants/'+ applicantType, formData)
                    .then(response => {
                        alert('Solicitante Creado' + response);
                    });
            break;
            case 'EDIT':
                axios.put('http://localhost:8080/applicants/'+ applicantType, formData)
                    .then(response => {
                        alert('Solicitante Actualizado' + response);
                    });
            break;
        }
    }

    render() {
        this.populateSelects();
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
                                        changed={(event) => this.setState({ form2: InputChangedHandlerForm2(event, formElement.id, this.state) })}
                                    />
                                </div>
                            ))}
                            {/* this shit chooses the tipe of clerk or student */}
                            {this.chooseApplicantForm()}
                        </div>

                        <button type="submit" className="btn btn-primary">{(this.props.function === 'CREATE') ? "Crear" : "Actualizar"}</button>

                    </form>
                </div>
            </div>

        );
    }
    //componentWillMount() {
    //}

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
        onChangeApplicantType: (applicantType) => dispatch({ type: "CHANGE_APPLICANT_TYPE", payload: applicantType })
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(ApplicantForm);


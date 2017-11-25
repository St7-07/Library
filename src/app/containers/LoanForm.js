import React from 'react';

import "../styles/Form.css";
import { Input, InputElement, SelectElement ,InputChangedHandler} from "../components/FormsUI/Input";
import axios from '../'

class LoanForm extends React.Component {
    constructor(props) {
    super();

        this.state =
            {
                form: {
                    barcode: InputElement('text', 'Barcode', '', "barcode","barcode"),
                    studentLicense: InputElement('text', 'Carnet', '', 'studentLicense', 'Carnet'),
                    endDate: InputElement('date','fecha', '', "endDate",'Fecha Devolucion'),
                }

            };


    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in this.state.form) {
            formData[formElementIdentifier] = this.state.form[formElementIdentifier].value;
        }
        switch (this.props.function) {
            case 'CREATE':
                axios.post('http://localhost:8080/loans/loan', formData)
                    .then(response => {
                        alert('Prestamo Creado' + response);
                    });
            break;
            case 'EDIT':
                axios.put('http://localhost:8080/loans/loan/'+ formData)
                    .then(response => {
                        alert('prestamo Actualizado' + response);
                    });
            break;
        }
    }

    formTypeHandler = () =>{
        switch(this.props.function){
            case "CREATE":
                this.setState({form: {
                    barcode: InputElement('text', 'Barcode', '', "barcode","barcode"),
                    studentLicense: InputElement('text', 'Carnet', '', 'studentLicense', 'Carnet'),
                    endDate: InputElement('date','fecha', '', "endDate",'Fecha Devolucion'),
                }});
            break;
            case "EDIT":
                this.setState({form: {
                    barcode: InputElement('text', 'Barcode', '', "barcode","barcode"),
                    endDate: InputElement('date','fecha', '', "endDate",'Fecha Devolucion'),
                }});
            break;
            case "RETURN":
                this.setState({form: {
                    barcode: InputElement('text', 'Barcode', '', "barcode","barcode")
                }});
            break;
        }
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.form) { //Creates an array to loop through an object attributes
            formElementsArray.push({
                id: key, //left side of attribute
                config: this.state.form[key] //right side attribute
            });
        }


        return (
            <div className="formSpace">
                <div className="row">
                    {/* <form> falta onSubmit */}
                    <form>
                        <div className="col-sm-2">
                            {formElementsArray.map(formElement => (
                                <div>
                                  
                                    <Input
                                        key={formElement.id}
                                        elementType={formElement.config.elementType}
                                        elementConfig={formElement.config.elementConfig}
                                        value={formElement.config.value}
                                        label = {formElement.config.label}
                                        changed={(event) => this.setState({form: InputChangedHandler(event, formElement.id, this.state)})}
                                   />
                                </div>
                            ))}
                        </div>

                        <div className="col-sm-2">
                            <button type="submit" className="btn btn-primary">{(this.props.function === 'CREATE') ? "Crear" : "Actualizar"}</button>
                        </div>
                    </form>
                </div>
            </div>

        );

    }

};





export default LoanForm;
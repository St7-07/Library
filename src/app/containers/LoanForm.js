import React from 'react';

import "../styles/Form.css";
import { Input, InputElement, SelectElement ,InputChangedHandler} from "../components/FormsUI/Input";
import axios from 'axios'

class LoanForm extends React.Component {
    constructor(props) {
        
    super();
    this.selectOptions = [
        {value:'00:00', displayValue: '00:00'},
        {value:'01:00', displayValue: '01:00'},
        {value:'02:00', displayValue: '02:00'},
        {value:'03:00', displayValue: '03:00'},
        {value:'04:00', displayValue: '04:00'},
        {value:'05:00', displayValue: '05:00'},
        {value:'06:00', displayValue: '06:00'},
        {value:'07:00', displayValue: '07:00'},
        {value:'07:30', displayValue: '07:30'},
        {value:'08:00', displayValue: '08:00'},
        {value:'08:30', displayValue: '08:30'},
        {value:'09:00', displayValue: '09:00'},
        {value:'09:30', displayValue: '9:30'},
        {value:'10:00', displayValue: '10:00'},
        {value:'10:30', displayValue: '10:30'},
        {value:'11:00', displayValue: '11:00'},
        {value:'11:30', displayValue: '11:30'},
        {value:'12:00', displayValue: '12:00'},
        {value:'12:30', displayValue: '12:30'},
        {value:'13:00', displayValue: '13:00'},
        {value:'13:30', displayValue: '13:30'},
        {value:'14:00', displayValue: '14:00'},
        {value:'14:30', displayValue: '14:30'},
        {value:'15:00', displayValue: '15:00'},
        {value:'15:30', displayValue: '15:30'},
        {value:'16:00', displayValue: '16:00'},
        {value:'16:30', displayValue: '16:30'},
        {value:'17:00', displayValue: '17:00'},
        {value:'17:30', displayValue: '17:30'},
        {value:'18:00', displayValue: '18:00'},
        {value:'18:30', displayValue: '18:30'},
        {value:'19:00', displayValue: '19:00'},
        {value:'19:30', displayValue: '19:30'},
        {value:'20:00', displayValue: '20:00'},
        {value:'20:30', displayValue: '20:30'},
        {value:'21:00', displayValue: '21:00'},
        {value:'21:30', displayValue: '21:30'},
        {value:'22:00', displayValue: '22:00'},
        {value:'23:00', displayValue: '23:00'},
        {value:'24:00', displayValue: '24:00'},
    ]
        this.state =
            {
                form: {
                    barcode: InputElement('text', 'Barcode', '', "barcode","Codigo de Barras"),
                    peopleLicenseOrId: InputElement('text', 'Carnet/Cedula', '', 'peopleLicenseOrId', 'Carnet'),
                    endDate: SelectElement(this.selectOptions, 
                        '', "finishDate",'Fecha Devolucion'),
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
                axios.put('http://localhost:8080/loans/renew/', formData)
                    .then(response => {
                        alert('prestamo Renovado' + response);
                    });
            break;
            case 'RETURN':
            axios.put('http://localhost:8080/loans/return/', formData)
                .then(response => {
                    alert('prestamo Devuelto' + response);
                });
        break;
        }
    }

    formTypeHandler = () =>{
        switch(this.props.function){
            case "CREATE":
                this.setState({form: {
                    barcode: InputElement('text', 'Barcode', '', "barcode","Codigo de Barras"),
                    peopleLicenseOrId: InputElement('text', 'Carnet/Cedula', '', 'peopleLicenseOrId', 'Carnet'),
                    endDate: InputElement('date','fecha', '', "endDate",'Fecha Devolucion'),
                }});
            break;
            case "EDIT":
                this.setState({form: {
                    barcode: InputElement('text', 'Barcode', '', "barcode","Codigo de Barras"),
                    endDate: SelectElement(this.selectOptions, 
                        '', "finishDate",'Fecha Devolucion'),
                }});
            break;
            case "RETURN":
                this.setState({form: {
                    barcode: InputElement('text', 'Barcode', '', "barcode","Codigo de Barras")
                }});
            break;
        }
    }

    componentDidUpdate(nextProps){
        if(!(this.props.function == nextProps.function)){
            this.formTypeHandler();
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
                    <form onSubmit={(event) => this.onSubmitHandler(event)}>
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
import React from "react";
import {connect} from 'react-redux';

import "../styles/Form.css";
import {Input, InputElement, SelectElement,InputChangedHandler} from "../components/FormsUI/Input";
import axios from 'axios';

class EquipmentForm extends React.Component {

    constructor(props) {
        super();
        this.state = {
            form: {
                barcode : InputElement('text', 'Nombre', '', "barcode", "Codigo Barras"),
                notes: InputElement('text', 'Notas', '', 'notes', "Notas"),
        
                category : SelectElement( [
                            {value:'1', displayValue: 'Laptop'},
                            {value:'2', displayValue: 'Video Beam'}]
                            ,'','category', "Categoria"),
        
                model : SelectElement( [
                            {value:'1', displayValue: '12321'},
                            {value:'2', displayValue: 'fsdfsd'}]
                             ,'','model', "Modelo"),
        
                brand : SelectElement( [
                           {value:'1', displayValue: 'VAIO'},
                           {value:'2', displayValue: 'Apple'}]
                            ,'','brand', "Marca"),
        
                state : SelectElement( [
                            {value:'1', displayValue: 'Prestada'},
                            {value:'2', displayValue: 'Disponible'}]
                            ,'','state', "Estado")
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
                axios.post('http://localhost:8080/av_equipments/av_equipment', formData)
                    .then(response => {
                        alert('Equipo Creado' + response);
                    });
            break;
            case 'EDIT':
                axios.put('http://localhost:8080/av_equipments/av_equipment/'+ formData)
                    .then(response => {
                        alert('Equipo Actualizado' + response);
                    });
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
                    <form onSubmit={(event) => this.onSubmitHandler(event)}>
                        <div className="col-sm-2">
                        {formElementsArray.map(formElement => ( 
                                <Input 
                                    key={formElement.id}
                                    elementType={formElement.config.elementType}
                                    elementConfig={formElement.config.elementConfig}
                                    value={formElement.config.value}
                                    label={formElement.config.label}
                                    changed={(event) => this.setState({form: InputChangedHandler(event, formElement.id, this.state)})}
                                />
                            ))}
                                                        
                            <div className="col-sm-4">
                                <button type="submit" className="btn btn-primary">{(this.props.function === 'CREATE')?"Crear":"Actualizar"}</button>
                            </div>  
                        </div>
                    </form>
                </div>
            </div>
        );
    }

}

export default EquipmentForm;

// const mapStateToProps = (state) => {
//     return {
//         equipment: state.equipmentReducer
//     };
// };

// const mapDispatchToProps = (dispatch) => {
//     return {
//         //onChangeValue: (value, inputIdentifier) => dispatch({type: "CHANGE_VALUE", payload: {value, inputIdentifier}})
//     };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(EquipmentForm);
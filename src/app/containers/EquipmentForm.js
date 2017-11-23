import React from "react";
import {connect} from 'react-redux';

import "../styles/Form.css";
import {Input, InputElement, SelectElement} from "../components/FormsUI/Input";

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

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedform = {
            ...this.state.form
        }
        const updatedFormElement = {
            ...updatedform[inputIdentifier]
        }
        updatedFormElement.value = event.target.value;
        updatedform[inputIdentifier] = updatedFormElement;
        this.setState({form: updatedform});
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
                                <Input 
                                    key={formElement.id}
                                    elementType={formElement.config.elementType}
                                    elementConfig={formElement.config.elementConfig}
                                    value={formElement.config.value}
                                    label={formElement.config.label}
                                    changed={(event) => this.inputChangedHandler(event, formElement.id)}
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
import React from "react";
import {connect} from 'react-redux';

import "../styles/Form.css";
import {Input} from "../components/FormsUI/Input";

class EquipmentForm extends React.Component {

    render() {
        
        const formElementsArray = [];
        for (let key in this.props.equipment.form) { //Creates an array to loop through an object attributes
            formElementsArray.push({
                id: key, //left side of attribute
                config: this.props.equipment.form[key] //right side attribute
            });
        }

        // inputChangedHandler = (event, inputIdentifier) => {
        //     const updatedform = {
        //         ...this.props.equipment.form
        //     }
        //     const updatedFormElement = {
        //         ...updatedform[inputIdentifier]
        //     }
        //     updatedFormElement.value = event.target.value;
        //     updatedform[inputIdentifier] = updatedFormElement;
        //     this.setState({form: updatedform});
        // }

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
                                    // changed={(event) => this.inputChangedHandler(event, formElement.id)}
                                    changed={(event) => this.props.equipment.onChangeValue(event.target.value, formElement.id)}
                                />
                            ))}  
                        </div>
                            
                        <div className="col-sm-2">
                            
                            <button type="submit" className="btn btn-primary">{(this.props.function === 'CREATE')?"Crear":"Actualizar"}</button>
                        </div>
                    </form>
            </div>
            </div>

        );
    }

}

const mapStateToProps = (state) => {
    return {
        equipment: state.equipmentReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onChangeValue: (value, inputIdentifier) => dispatch({type: "CHANGE_VALUE", payload: {value, inputIdentifier}})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EquipmentForm);
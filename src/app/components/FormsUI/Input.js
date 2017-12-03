import React from 'react';
import './Input.css';


 export const Input = (props) => {
    let inputElement = null;
    let error =
    (
        <p id='error'>Introduzca un {props.label} valido</p>
    ) 
    
    switch(props.elementType) {
        case('input'):
            inputElement = (<input 
                                className="form-control input-sm"
                                {...props.elementConfig}
                                onChange={props.changed}
                                value={props.value}/>);
        break;
        case('select'):
                inputElement = (
                 <select className="form-control"  value={props.value} onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value} >
                            {option.displayValue}
                        </option>
                    ))}
                </select>
                );
        break;
        default:
    }
  
    
    return (
        
        <div className="form-group">
            <label for={props.elementConfig.id}>{props.label + ":"}</label>
            {inputElement}
            {/* {error} */}
        </div>
    );
};

export const InputElement = ( type, placeholder, value, name, label,required, valid, minLength, maxLength) => {
    return {
        elementType: 'input',
        elementConfig: {
            type: type,
            placeholder: placeholder,
            name: name,
            id: name
        },
        label:label,
        value:value,
        validation:
        {
            required: required,
            minLength: minLength,
            maxLength: maxLength
        },
    valid: valid,
    };
};

export const SelectElement =(options, value, name, label) => {
    return {
        elementType: 'select',
        elementConfig: {
            options: options,
            name: name,
            id: name
        },
        label:label,
        value:value,
        validation: {},
        valid: true
    };
}

export const CheckValidity = (value, rules) => {
    let isValid = true;
    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }
    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid
}

export const InputChangedHandler = (event, inputIdentifier, state ) => {
    const updatedform = {
        ...state.form
    }
    const updatedFormElement = {
        ...updatedform[inputIdentifier]
    }
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = CheckValidity(updatedFormElement.value, updatedFormElement.validation);
    console.log(updatedFormElement);
    updatedform[inputIdentifier] = updatedFormElement;
    let formIsValid = true;
    for(let inputIdentifiers in updatedform) 
    {
        formIsValid = updatedform[inputIdentifier].valid &&  formIsValid
        state.formIsValid = formIsValid
    }
    
    console.log(state.formIsValid);
    return updatedform;
}

export const InputChangedHandlerForm2 = (event, inputIdentifier, state) => {
    const updatedform = {
        ...state.form2
    }
    const updatedFormElement = {
        ...updatedform[inputIdentifier]
    }
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = CheckValidity(updatedFormElement.value, updatedFormElement.validation);
    console.log(updatedFormElement);
    updatedform[inputIdentifier] = updatedFormElement;
    return updatedform;
}

import React from 'react';
import './Input.css';

import classes from './Input.css';

 export const Input = (props) => {
    let inputElement = null;
    const inputClasses = [classes.InputElement];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }
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
        
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
};

export const InputElement = ( type, placeholder, value, name, label,required, valid, minLength, maxLength,touched) => {
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
    touched: touched
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

export const checkValidity = ( value, rules ) => {
    let isValid = true;
    if ( !rules ) {
        return true;
    }

    if ( rules.required ) {
        isValid = value.trim() !== '' && isValid;
    }

    if ( rules.minLength ) {
        isValid = value.length >= rules.minLength && isValid
    }

    if ( rules.maxLength ) {
        isValid = value.length <= rules.maxLength && isValid
    }

    if ( rules.isEmail ) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test( value ) && isValid
    }

    if ( rules.isNumeric ) {
        const pattern = /^\d+$/;
        isValid = pattern.test( value ) && isValid
    }

    return isValid;
}




export const InputChangedHandlerForm2 = (event, inputIdentifier, state) => {
    const updatedform = {
        ...state.form2
    }
    const updatedFormElement = {
        ...updatedform[inputIdentifier]
    }
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
    console.log(updatedFormElement);
    updatedform[inputIdentifier] = updatedFormElement;
    return updatedform;
}

export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};
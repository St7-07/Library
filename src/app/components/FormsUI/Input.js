import React from 'react';
import './Input.css';

 export const Input = (props) => {
    let inputElement = null;

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
        </div>
    );
};

export const InputElement = ( type, placeholder, value, name, label) => {
    return {
        elementType: 'input',
        elementConfig: {
            type: type,
            placeholder: placeholder,
            name: name,
            id: name
        },
        label:label,
        value:value
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
        value:value
    };
}

export const InputChangedHandler = (event, inputIdentifier, state) => {
    const updatedform = {
        ...state.form
    }
    const updatedFormElement = {
        ...updatedform[inputIdentifier]
    }
    updatedFormElement.value = event.target.value;
    updatedform[inputIdentifier] = updatedFormElement;
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
    updatedform[inputIdentifier] = updatedFormElement;
    return updatedform;
}

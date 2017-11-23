import React from 'react';
import './Input.css';

 export const Input = (props) => {
    let inputElement = null;

    switch(props.elementType) {
        case('input'):
            inputElement = (<input 
                                className="form-control input-sm"
                                {...props.elementConfig}
                                value={props.value}/>);
        break;
        case('select'):
                inputElement = (
                 <select className="form-control">
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
                );
        break;
        default:
        inputElement = (<input 
            className="form-control input-sm"
            {...props.elementConfig}
            value={props.value}/>);

    }

    return (
        <div className="form-group">
            <label for={props.elementConfig.id}>{props.label}</label>
            {inputElement}
        </div>
    );
};

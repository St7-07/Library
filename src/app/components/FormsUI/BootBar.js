import React from 'react';

export const BootBar = (props) => {
    let colorType = 'progress-bar-';

    switch(props.color) {
        case 'RED':
            colorType = 'danger';
        break;
        case 'GREEN':
            colorType = 'success';
        break;
        case 'ORANGE':
            colorType = 'warning';
        break;
        case 'LIGHTBLUE':
            colorType = 'info';
        break;
        case 'BLUE':
            colorType = '';
        break;
        default:
            colorType = '';
        break;
    }

    let classAtt = 'progress-bar progress-bar-striped active' + colorType;
    let percentage = 'width:' + props.average + '%';
    return (
        <div>
            <label>{props.label}</label>
            <div className="progress">
                <div className={classAtt} role="progressbar"
                    aria-valuenow={props.average} aria-valuemin="0" aria-valuemax="100" style={percentage}>
                    {props.innerText}
                </div>
            </div>
        </div>
    ); 
};
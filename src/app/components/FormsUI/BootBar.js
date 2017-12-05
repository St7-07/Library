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

    let classAtt = 'progress-bar progress-bar-striped active  progress-bar-' + colorType;
    let percentage =  (isNaN(props.average * 100 /props.total) ? 0 + '%' : (props.average * 100 /props.total)  + '%');

    
    console.log(percentage );
    console.log( props.average );
    
    return (
        <div>
            <label>{props.label}</label>
            <div className="progress">
                <div className={classAtt} role="progressbar"
                    aria-valuenow={props.average} aria-valuemin="0" aria-valuemax={props.total} style={{width: percentage }}>
                      <label className="labelNumber" >{props.innerText}</label>  
                </div>
            </div>
        </div>
    ); 
};
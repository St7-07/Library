import React from 'react';

export const BootAlert = (props) => {

    return (
        <div class="alert alert-success alert-dismissable fade in" id={props.id}>
            <a href="#" class="close" data-dismiss="alert" aria-label="close" >&times;</a>
            <strong>{props.title}</strong> {props.message}
        </div>
    );
};
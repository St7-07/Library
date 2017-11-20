import React from 'react';

export const StudentForm = (props) => {
    return (
        <div>
            <div className="form-group">
                <label for="career">Carrera:</label>
                <input type="text" className="form-control" id="career" name="career"/>
            </div>
            <div className="form-group">
                <label for="studentID">Carnet:</label>
                <input type="text" className="form-control" id="studentID" name="studentID"/>
            </div>
        </div>
    );
}
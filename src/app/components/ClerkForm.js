import React from 'react';

export const ClerkForm = (props) => {
    return (
        <div>
            <div className="form-group">
                <label for="department">Departamento:</label>
                <input type="text" className="form-control input-sm" id="department" name="department"/>
            </div>
            <div className="form-group">
                <label for="position">Posicion:</label>
                <input type="text" className="form-control input-sm" id="position" name="position"/>
            </div>
        </div>
    );
}
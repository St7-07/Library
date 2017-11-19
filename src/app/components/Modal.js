import React from 'react';

const Modal = (props) => {
    return(
        <div>
            <div className="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" id='myModal'>
            <div className="modal-dialog modal-sm" role="document">
                <div className="modal-content">
                    <div className="list-group">
                        <a href="#" className="list-group-item" 
                        onClick={() => clickHandler("update",props.selectedData)}>Editar</a>
                        <a href="#" className="list-group-item"
                        onClick={() => clickHandler("delete",props.selectedData)}>Eliminar</a>
                        <a href="#" className="list-group-item"
                        onClick={() => clickHandler("showLoans",props.selectedData)}>Ver Morosidades</a>
                        <a href="#" className="list-group-item"
                        onClick={() => clickHandler("showDefaulters",props.selectedData)}>Ver Prestamos</a>
                    </div>
                </div>
            </div>
            </div>
        </div>
        
    )
    

   
}

function clickHandler(optionSelected, selectedData){
    switch(optionSelected){
        case "update":
        //Ya aquí la idea es enviar los datos al form
        console.log(selectedData.name);
        break;
        case "delete":
        break;
        case "showLoans":
        break;
        case "showDefaulters":
        break;
    }
}

export default Modal;
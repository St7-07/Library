import React from 'react';
import {setSubcontent} from "../actions/sectionActions";
import { connect } from "react-redux";
import axios from 'axios';
const Modal = (props) => {
    return(
        <div>
            <div className="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" id='myModal'>
            <div className="modal-dialog modal-sm" role="document">
                <div className="modal-content">
                    <div className="list-group">
                        <a href="#" className="list-group-item" 
                        onClick={() => setSubcontent("updateApplicant")}>Editar</a>
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
        $('#myModal').modal('hide');
        
        // console.log(selectedData.name);
        break;
        case "delete":
            let id = selectedData.studentId;
            axios.delete('http://localhost:8080/applicants/student/'+id)
            .then(response =>{
                

            })
        break;
        case "showLoans":
        break;
        case "showDefaulters":
        break;
    }
}

const mapStateToProps = (state) => {
    return {
        sectionReducer: state.sectionReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setSubcontent: (type) => {
            dispatch(setSubcontent(type));
        }

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);

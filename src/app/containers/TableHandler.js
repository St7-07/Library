import React, { Component } from 'react';
import { connect } from 'react-redux';

import Table from '../components/Table';

import { setDataType } from '../actions/tableActions';

import {Button} from "../components/Button";
import {setSubcontent} from "../actions/sectionActions";



class TableHandler extends Component {

    render() {

        let applicantsButtons = null;
        if (this.props.tableType === "students" 
            || this.props.tableType === "clerks"){
                applicantsButtons = <div className="btn-group optionsButton">
                <button type="button" className="btn btn-primary"
                    onClick={() => this.props.setSubcontent("studentsTable")}>Estudiante</button>
                <button type="button" className="btn btn-primary"
                    onClick={() => this.props.setSubcontent("clerksTable")}>Funcionario</button>
                </div>
        }

        console.log("did render" + this.props.tableReducer.dataType)
        return (
            <div>
                {applicantsButtons}
                {this.switchTableType()}
            </div>
        );

    }


    switchTableType() {
        console.log()
        let tableType = <Table tableType={this.props.tableType}/>
        return tableType
    }

    componentWillMount(){
        console.log("ENTRE A componentWillMount()")
        this.props.setDataType(this.props.tableType);
    }
};



const mapStateToProps = (state) => {
    return {
        tableReducer: state.tableReducer,
        applicantReducer: state.applicantReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setDataType: (dataType) => {
            dispatch(setDataType(dataType));
        },
        setApplicant: (type, name) => {
            dispatch(setApplicant(type, name));
        },
        setSubcontent: (type) => {
            dispatch(setSubcontent(type));
        }

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TableHandler);
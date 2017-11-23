import React, { Component } from 'react';
import { connect } from 'react-redux';

import Table from '../components/Table';

import { setDataType } from '../actions/tableActions';



class TableHandler extends Component {

    render() {
        console.log("did render" + this.props.tableReducer.dataType)
        return (
            <div>
                <div className="btn-group optionsButton">
                    <button type="button" className="btn btn-primary"
                        onClick={() => this.props.setDataType('students')}>Estudiante</button>
                    <button type="button" className="btn btn-primary"
                        onClick={() => this.props.setDataType('clerks')}>Funcionario</button>
                </div>
                {this.switchTableType()}
            </div>
        );

    }

    switchTableType() {
        let tableType = <Table tableType={this.props.tableReducer.dataType} setApplicant={this.props.setApplicant}/>
        return tableType
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
        }

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TableHandler);
import React, {Component} from 'react';
import {connect} from 'react-redux';

import Table from '../components/Table'

import {setDataType} from '../actions/tableActions'

class TableHandler extends Component{

    render(){
        console.log("did render"+this.props.tableReducer.dataType)
        return(
            <div>
                <div className="btn-group">
                        <button type="button" className="btn btn-primary" 
                        onClick={() => this.props.setDataType('students')}>Estudiante</button>
                        <button type="button" className="btn btn-primary" 
                        onClick={() => this.props.setDataType('clerks')}>Funcionario</button>
                </div>
                {this.switchTableType()}
            </div>
        );
        
    }

    switchTableType(){
        let tableType = <Table tableType={this.props.tableReducer.dataType}/>
        return tableType
    }
};



const mapStateToProps = (state) => {
    return {
        tableReducer: state.tableReducer,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setDataType: (dataType) => {
            dispatch(setDataType(dataType));
        }

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TableHandler);
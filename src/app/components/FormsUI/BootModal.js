import React from 'react';
import './Input.css';
import axios from 'axios';
import BootAlert from "./BootAlert";

class BootModal extends React.Component {

    constructor(props) {
        super();
        this.state = {
            value: ''
        };
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8080/' + this.props.url, this.state)
            .then(response => {
                document.getElementById('modalAlert').hidden = false;
                this.props.renderData();
            });
    }

    inputChangedHandler = (event) => {
        this.setState({ value: event.target.value });
    }

    closeModal = () => {
        document.getElementById('modalAlert').hidden = true;
    }

    render() {
        return (
            <div>
                <button type="button" className="btn btn-info btn-sm" data-toggle="modal" data-target={'#' + this.props.modalID}>Nueva {this.props.label}</button>

                <div className="modal fade" id={this.props.modalID} role="dialog">
                    <div className="modal-dialog">

                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" 
                                onClick={() => this.closeModal()}>&times;</button>
                                <h4 className="modal-title">Nueva {this.props.label}</h4>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={(event) => this.onSubmitHandler(event)}>
                                    <div className="form-group">
                                        <label for={this.props.name}>{this.props.label}: </label>
                                        <input required className="form-control input-sm" type="text" name={this.props.name} id={this.props.name}
                                            onChange={(event) => this.inputChangedHandler(event)} />
                                    </div>
                                    <br />
                                    <input type="submit" className="btn btn-success btn-sm" value="Guardar" />
                                    <br />
                                    <BootAlert id='modalAlert' title="Exito!" 
                                    message= {this.props.label + ": " + this.state.value + " guardada."}/>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" 
                                data-dismiss="modal" onClick={() => this.closeModal()}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default BootModal;




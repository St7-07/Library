import React from 'react';
import axios from 'axios';
import BootAlert from "../components/FormsUI/BootAlert";

 class RestorePassModal extends React.Component {

    constructor(props) {
        super();
        this.state = {
            username : '',
            newpass: '',
            adminPass : ''
        };
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
            axios.post('http://localhost:8080/users/validate', {username: 'admin', password: this.state.adminPass})
                .then(response => {
                    if (response.data.valid) {
                        document.getElementById('fail').hidden = true;
                        this.updatePassword();
                    } else {
                        document.getElementById('fail').hidden = false;
                    }
            });
    }

    updatePassword() {
        axios.put('http://localhost:8080/users/pass', {username: this.state.username, password: this.state.newpass})
        .then(response => {
            console.log(response);
            document.getElementById('alert').hidden = false;
        });
    }

    inputChangedHandler = (event, type) => {
        switch (type) {
            case 'username':
                this.setState({...this.state, username: event.target.value});
            break;
            case 'newpass':
                this.setState({...this.state, newpass: event.target.value});
            break;
            case 'adminpass':
                this.setState({...this.state, adminPass: event.target.value});
            break;
        }
    }

   render() {
        return (
                <div>

                        <div className="modal fade" id={this.props.modalID} role="dialog">
                        <div className="modal-dialog">
                        
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <h4 className="modal-title">Cambio de Contraseña</h4>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={(event) => this.onSubmitHandler(event)}>
                                    <div className="form-group">
                                        <label for="username">Nombre de usuario: </label>
                                        <input className="form-control input-sm" type="text" name="username" id="username"
                                            onChange={(event)=> this.inputChangedHandler(event, 'username')}/>
                                    </div>

                                    <div className="form-group">
                                        <label for="pass">Nueva contraseña: </label>
                                        <input className="form-control input-sm" type="text" name="pass" id="pass"
                                            onChange={(event)=> this.inputChangedHandler(event, 'newpass')}/>
                                    </div>

                                     <div className="form-group">
                                        <label for="adminPass">Contraseña de Administrador: </label>
                                        <input className="form-control input-sm" type="text" name="adminPass" id="adminPass"
                                            onChange={(event)=> this.inputChangedHandler(event, 'adminpass')}/>
                                    </div>
                                    <br/>
                                    <input type="submit" className="btn btn-success btn-sm" value="Guardar"/>
                                </form>
                                <BootAlert id="alert" title="Exito!" message="La contraseña ha sido actualizada." alertType="success"/>
                                <BootAlert id="fail" title="Fallo!" message="La contraseña de administrador es invalida." alertType="warning"/>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
        );
    }
};

export default RestorePassModal;



 
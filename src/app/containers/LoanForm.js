import React from 'react';

import "../styles/Form.css";
import { Input, InputElement, SelectElement ,InputChangedHandler,checkValidity} from "../components/FormsUI/Input";
import axios from 'axios';
import BootAlert from '../components/FormsUI/BootAlert';

class LoanForm extends React.Component {
    constructor(props) {
        
    super();
    this.selectOptions = [
        {value:'00:00', displayValue: '00:00'},
        {value:'01:00', displayValue: '01:00'},
        {value:'02:00', displayValue: '02:00'},
        {value:'03:00', displayValue: '03:00'},
        {value:'04:00', displayValue: '04:00'},
        {value:'05:00', displayValue: '05:00'},
        {value:'06:00', displayValue: '06:00'},
        {value:'07:00', displayValue: '07:00'},
        {value:'07:30', displayValue: '07:30'},
        {value:'08:00', displayValue: '08:00'},
        {value:'08:30', displayValue: '08:30'},
        {value:'09:00', displayValue: '09:00'},
        {value:'09:30', displayValue: '9:30'},
        {value:'10:00', displayValue: '10:00'},
        {value:'10:30', displayValue: '10:30'},
        {value:'11:00', displayValue: '11:00'},
        {value:'11:30', displayValue: '11:30'},
        {value:'12:00', displayValue: '12:00'},
        {value:'12:30', displayValue: '12:30'},
        {value:'13:00', displayValue: '13:00'},
        {value:'13:30', displayValue: '13:30'},
        {value:'14:00', displayValue: '14:00'},
        {value:'14:30', displayValue: '14:30'},
        {value:'15:00', displayValue: '15:00'},
        {value:'15:30', displayValue: '15:30'},
        {value:'16:00', displayValue: '16:00'},
        {value:'16:30', displayValue: '16:30'},
        {value:'17:00', displayValue: '17:00'},
        {value:'17:30', displayValue: '17:30'},
        {value:'18:00', displayValue: '18:00'},
        {value:'18:30', displayValue: '18:30'},
        {value:'19:00', displayValue: '19:00'},
        {value:'19:30', displayValue: '19:30'},
        {value:'20:00', displayValue: '20:00'},
        {value:'20:30', displayValue: '20:30'},
        {value:'21:00', displayValue: '21:00'},
        {value:'21:30', displayValue: '21:30'},
        {value:'22:00', displayValue: '22:00'},
        {value:'23:00', displayValue: '23:00'},
        {value:'24:00', displayValue: '24:00'},
    ]
        this.state =
            {
                form: {
                    barcode: InputElement('text', 'Barcode', '', "barcode","Codigo de Barras",true, false, 5, 20,false),
                    peopleLicenseOrId: InputElement('text', 'Carnet/Cedula', '', 'peopleLicenseOrId', 'Carnet',true, false, 5, 20,false),
                    endDate: SelectElement(this.selectOptions, 
                        '', "finishDate",'Fecha Devolucion'),
                },
                loanedAvs : null,
                delinquentsIdentifications: null,
                delinquentsLicense: null,
                avFinishDate: null,
                formIsValid:false,

                alert :{
                    message: "",
                    type : "",
                    title:""
                },
                delinquentBootAlert : null
            };
    }

    onSubmitHandler = (event) => {
        document.getElementById('alert').hidden = true;
        if(this.state.delinquentBootAlert){
            document.getElementById('delqAlert').hidden = true;
        }
        event.preventDefault();
        const formData = {};

        for (let formElementIdentifier in this.state.form) {
            formData[formElementIdentifier] = this.state.form[formElementIdentifier].value;
        }
        switch (this.props.function) {    
            case 'CREATE':
                if((!this.avAlreadyLoaned()) && (!this.isDelinquent())){
                    axios.post('http://localhost:8080/loans/loan', formData)
                    .then(response => {
                        this.setState({alert:{
                                            message: "Prestamo realizado con exito",
                                            type : "success",
                                            title:"Exito!"
                                        }});
                        document.getElementById('alert').hidden = false;
                        this.reloadData();
                        console.log("Si se hizo prestamo")
                    });
                }else{
                    this.setState({alert:{
                        message: "El solicitante tiene una morosidad pendiente o el equipo ya está en prestamo",
                        type : "danger",
                        title:"Error!"
                    }});
                    document.getElementById('alert').hidden = false;
                    console.log("No se hizo prestamo")
                }
            break;
            case 'EDIT':
                if(this.avAlreadyLoaned()){
                    axios.put('http://localhost:8080/loans/renew/', formData)
                    .then(response => {
                        this.setState({alert:{
                            message: "Prestamo renovado con exito",
                            type : "success",
                            title:"Exito!"
                        }});
                        document.getElementById('alert').hidden = false;
                        this.reloadData();
                        console.log("se renovo")
                    });
                }else{
                    his.setState({alert:{
                        message: "Equipo no se encuentra en prestamo",
                        type : "danger",
                        title:"Error!"
                    }});
                    document.getElementById('alert').hidden = false;
                    console.log("no se renovo")
                }     
            break;
            case 'RETURN':
                if(this.avAlreadyLoaned()){
                    axios.put('http://localhost:8080/loans/return/', formData)
                    .then(response => {
                        this.reloadData();
                        this.setState({alert:{
                            message: "Prestamo devuelto con exito",
                            type : "success",
                            title:"Exito!"
                        }});
                        document.getElementById('alert').hidden = false;
                        this.validateDelinquency(this.getFinishDate());
                        console.log("se devolvio")
                    });
                }else{
                    his.setState({alert:{
                        message: "Equipo no se encuentra en prestamo",
                        type : "danger",
                        title:"Error!"
                    }});
                    document.getElementById('alert').hidden = false;
                    console.log("no se devolvio")
                } 
            break;
        }
    }

    formTypeHandler = () =>{
        document.getElementById('alert').hidden = true;
        if(this.state.delinquentBootAlert){
            document.getElementById('delqAlert').hidden = true;
        }
        switch(this.props.function){
            case "CREATE":
                this.setState({
                    ...this.state,
                    form: {
                    barcode: InputElement('text', 'Barcode', '', "barcode","Codigo de Barras",true, false, 5, 20,false),
                    peopleLicenseOrId: InputElement('text', 'Carnet/Cedula', '', 'peopleLicenseOrId', 'Carnet',true, false, 5, 20,false),
                    endDate: SelectElement(this.selectOptions, 
                        '', "finishDate",'Fecha Devolucion'),
                },formIsValid:false});
            break;
            case "EDIT":
            this.setState({
                ...this.state,
                form: {
                barcode: InputElement('text', 'Barcode', '', "barcode","Codigo de Barras",true, false, 5, 20,false),
                endDate: SelectElement(this.selectOptions, 
                    '', "finishDate",'Fecha Devolucion'),
            },formIsValid:false});
            break;
            case "RETURN":
            this.setState({
                ...this.state,
                form: {
                barcode: InputElement('text', 'Barcode', '', "barcode","Codigo de Barras",true, false, 5, 20,false)
            },formIsValid:false });
            break;
        }
    }

    avAlreadyLoaned = () => {
        let barcode = this.state.form.barcode.value;
        let avs = [];
        let isLoaned= false;

        if(this.state.loanedAvs){
            avs = this.state.loanedAvs.map(av => {
                return{
                    loanedBarcode : av.barcode
                }
            });
        }

        for(let key in avs){
            if(avs[key].loanedBarcode == barcode){
                isLoaned = true;
            }
        }
        return isLoaned;
    }

    isDelinquent = () =>{
        let identifier = this.state.form.peopleLicenseOrId.value;
        let delinquentsIds = [];
        let delinquentsLicense = [];
        let isDelinquent= false;

        if(identifier.length == 6){ //In case that the identifier is a license
            if(this.state.delinquentsLicense){
                delinquentsLicense = this.state.delinquentsLicense.map(delq => {
                    return{
                        delinquentId : delq.studentLicense
                    }
                });
            }
            for(let key in delinquentsLicense){
                if(delinquentsLicense[key].delinquentId == identifier){
                    isDelinquent = true;
                }
            }
        }else if(identifier.length == 10){//In case that the identifier is an identification
            if(this.state.delinquentsIdentifications){
                delinquentsIds = this.state.delinquentsIdentifications.map(delq => {
                    return{
                        delinquentId : delq.identification
                    }
                });
            }
            for(let key in delinquentsIds){
                if(delinquentsIds[key].delinquentId == identifier){
                    isDelinquent = true;
                }
            }
        }
        return isDelinquent;
    }

    getFinishDate = () =>{
        let barcode = this.state.form.barcode.value;
        let finishDates = [];
        let finishDate = new Date();

        if(this.state.avFinishDate){
            finishDates = this.state.avFinishDate.map(finishDate => {
                return{
                    date : finishDate.loanFinishDate,
                    barcode : finishDate.barcode
                }
            });
        }
        for(let key in finishDates){
            if(finishDates[key].barcode == barcode){
                finishDate = finishDates[key].date
            }
        }
        return finishDate;
    }

    validateDelinquency = (finishDate) =>{
        let today = new Date();
        let finish = finishDate.slice(0, -5);
        let finishD = new Date(finish);
        console.log(finishD);
        let hours = (today - finishD) / 36e5
        if(hours >= 1){
            let barcode = this.state.form.barcode.value;
            let numDays = Math.floor(hours);
            console.log(numDays);
            let data = {barcode: barcode, 
                    numDays : numDays}
            axios.post('http://localhost:8080/delinquencies/create', data)
            .then(response =>{
                this.setState({delinquentBootAlert : 
                    <BootAlert alertType="warning" id="delqAlert" title="Alerta!"
                    message={response.data}/>})
                document.getElementById('delqAlert').hidden = false;
            })
        }
    }

    componentDidUpdate(nextProps){
        if(!(this.props.function == nextProps.function)){
            this.formTypeHandler();
        }
        if((!this.state.loanedAvs) || (!this.state.delinquentsIdentifications)
            ||(!this.state.delinquentsLicense)){
                this.reloadData();
        }
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedForm =
            {
                ...this.state.form
            };
        const updatedFormElement =
            {
                ...updatedForm[inputIdentifier]
            };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedForm[inputIdentifier] = updatedFormElement;
         let formIsValid = true;
        for (let inputIdentifier in updatedForm) {
            formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
        }
        console.log(updatedFormElement);
        this.setState({ form: updatedForm, formIsValid:formIsValid });   
    }

    reloadData(){
        axios.get('http://localhost:8080/av_equipments/loanedAVs')
        .then(response =>{
            this.setState({loanedAvs: response.data});
        });

        axios.get('http://localhost:8080/delinquencies/identifications')
        .then(response =>{
            this.setState({delinquentsIdentifications: response.data});
        });

        axios.get('http://localhost:8080/delinquencies/studentsLicense')
        .then(response =>{
            this.setState({delinquentsLicense: response.data});
        });

        axios.get('http://localhost:8080/loans/finishDates/')
        .then(response =>{
            this.setState({avFinishDate:response.data})
        });
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.form) { //Creates an array to loop through an object attributes
            formElementsArray.push({
                id: key, //left side of attribute
                config: this.state.form[key] //right side attribute
            });
        }
        return (
            <div className="formSpace">
                <div className="row">
                    <form onSubmit={(event) => this.onSubmitHandler(event)}>
                        <div className="col-sm-2">
                            {formElementsArray.map(formElement => (
                                <div>
                                    <Input
                                        key={formElement.id}
                                        elementType={formElement.config.elementType}
                                        elementConfig={formElement.config.elementConfig}
                                        value={formElement.config.value}
                                        label = {formElement.config.label}
                                        invalid={!formElement.config.valid}
                                        shouldValidate={formElement.config.validation}
                                        touched={formElement.config.touched}
                                        changed={(event) => this.inputChangedHandler(event, formElement.id)}
                                   />
                                </div>
                            ))}
                        </div>

                        <div className="col-sm-2">
                            <button disabled={!this.state.formIsValid } type="submit" className="btn btn-primary">{(this.props.function === 'CREATE') ? "Crear" : "Actualizar"}</button>
                        </div>
                    </form>
                </div>
                <br/>
                    <BootAlert alertType={this.state.alert.type} id="alert" title={this.state.alert.title}
                                message={this.state.alert.message}/>

                    {this.state.delinquentBootAlert}
            </div>
        );
    } 
};


export default LoanForm;
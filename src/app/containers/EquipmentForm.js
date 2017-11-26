import React from "react";
import {connect} from 'react-redux';

import "../styles/Form.css";
import {Input, InputElement, SelectElement,InputChangedHandler} from "../components/FormsUI/Input";
import axios from 'axios';

class EquipmentForm extends React.Component {

    constructor(props) {
        super();
        this.state = {
            form: {
                barcode : InputElement('text', 'Nombre', '', "barcode", "Codigo Barras"),
                notes: InputElement('text', 'Notas', '', 'notes', "Notas"),
        
                category : SelectElement( [
                                {value:'1', displayValue: 'toDeploy'},]
                                ,'','category', "Categoria"),
        
                model : InputElement('text', 'Modelo', '', "model", "Modelo"),
        
                brand : SelectElement( [
                           {value:'1', displayValue: 'VAIO'},
                           {value:'2', displayValue: 'Apple'}]
                            ,'','brand', "Marca"),
        
                state : SelectElement( [
                            {value:'1', displayValue: 'Prestada'},
                            {value:'2', displayValue: 'Disponible'}]
                            ,'','state', "Estado")
            },
            loadedCategories: null,
            loadedBrands: null,
            loadedStates: null
        };
    }

 
    onSubmitHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in this.state.form) {
            formData[formElementIdentifier] = this.state.form[formElementIdentifier].value;
        }
        switch (this.props.function) {
            case 'CREATE':
                axios.post('http://localhost:8080/av_equipments/av_equipment', formData)
                    .then(response => {
                        alert(response);
                    });
            break;
            case 'EDIT':
                axios.put('http://localhost:8080/av_equipments/av_equipment/'+ formData)
                    .then(response => {
                        alert( response);
                    });
            break;
        }
    }

    getDataForSelects(){
        if(!this.state.loadedCategories){
            axios.get('http://localhost:8080/av_equipments/categories')
            .then(response =>{
                this.setState({loadedCategories:response.data});
            });
        }

        if(!this.state.loadedBrands){
            axios.get('http://localhost:8080/av_equipments/brands')
            .then(response =>{
                this.setState({loadedBrands:response.data});
            });
        }

        if(!this.state.loadedStates){
            axios.get('http://localhost:8080/av_equipments/states')
            .then(response =>{
                this.setState({loadedStates:response.data});
            });
        }
        
    }

    populateSelects(){
        if(this.state.loadedCategories 
            && this.state.loadedBrands
            && this.state.loadedStates
            && (this.state.form.category.elementConfig.options.length == 1) ){

            let categories = this.state.loadedCategories.map(category =>{
                return{
                    value: category.id_category,
                    displayValue: category.category
                }
            });

            let brands = this.state.loadedBrands.map(brand =>{
                return{
                    value: brand.id_brand,
                    displayValue: brand.brandType
                }
            });

            let states = this.state.loadedStates.map(state =>{
                return{
                    value: state.id_state,
                    displayValue: state.stateType
                }
            });

            this.changeFormState(categories,brands,states);
            
            
        }
    }


    changeFormState(categories, brands,states){
        this.setState({form : {
            barcode : InputElement('text', 'Nombre', '', "barcode", "Codigo Barras"),
            notes: InputElement('text', 'Notas', '', 'notes', "Notas"),
            category : SelectElement(categories,'', 'category','Categoria'),
            model : InputElement('text', 'Modelo', '', "model", "Modelo"),
            brand : SelectElement( brands,'','brand', "Marca"),
            state : SelectElement(states,'','state', "Estado")
        }});
        
    }

    componentDidMount(){
        this.getDataForSelects();
    }

    render() {
        this.populateSelects();
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
                    {/* <form> falta onSubmit */}
                    <form onSubmit={(event) => this.onSubmitHandler(event)}>
                        <div className="col-sm-2">
                        {formElementsArray.map(formElement => ( 
                                <Input 
                                    key={formElement.id}
                                    elementType={formElement.config.elementType}
                                    elementConfig={formElement.config.elementConfig}
                                    value={formElement.config.value}
                                    label={formElement.config.label}
                                    changed={(event) => this.setState({form: InputChangedHandler(event, formElement.id, this.state)})}
                                />
                            ))}
                                                        
                            <div className="col-sm-4">
                                <button type="submit" className="btn btn-primary">{(this.props.function === 'CREATE')?"Crear":"Actualizar"}</button>
                            </div>  
                        </div>
                    </form>
                </div>
            </div>
        );
    }

}

export default EquipmentForm;

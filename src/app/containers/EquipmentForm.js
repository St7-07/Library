import React from "react";
import {connect} from 'react-redux';

import "../styles/Form.css";
import {Input, InputElement, SelectElement,InputChangedHandler} from "../components/FormsUI/Input";
import axios from 'axios';

class EquipmentForm extends React.Component {

    constructor(props) {
        super();
        const UPDATE = (props.function == 'UPDATE') ? true : false;
        this.state = {
            old_barcode : (UPDATE) ? props.equipment.barcode: '',
            old_model : (UPDATE) ? props.equipment.model: '',
            categoryID:0,
            brandID:0,
            stateID:0,
            form: {
                barcode : InputElement('text', 'Nombre', (UPDATE)?props.equipment.barcode:''
                            , "barcode", "Codigo Barras"),
        
                category : SelectElement( [
                                {value:'1', displayValue: 'toDeploy'},]
                                ,'','category', "Categoria"),
        
                model : InputElement('text', 'Modelo', (UPDATE)?props.equipment.model:''
                            , "model", "Modelo"),
        
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
                        alert("Equipo Creado \n Codigo de Barras: " + formData.barcode);
                    });
            break;
            case 'UPDATE':
                let data = {
                    ...formData,
                    old_barcode : this.state.old_barcode,
                    old_model: this.state.old_model
                };
                axios.put('http://localhost:8080/av_equipments/av_equipment/'+ data.old_barcode, data)
                    .then(response => {
                        alert("Equipo Actualizado \n Codigo de Barras: " + formData.barcode);
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

            let categories = this.state.loadedCategories.map(category => {
                if (this.state.categoryID === 0 && category.category === this.props.equipment.category) {
                    this.state.categoryID = category.id_category;
                }
                return{
                    value: category.id_category,
                    displayValue: category.category
                }
            });

            let brands = this.state.loadedBrands.map(brand =>{
                if (this.state.brandID === 0 && brand.brandType === this.props.equipment.brand) {
                    this.state.brandID = brand.id_brand;
                }
                return{
                    value: brand.id_brand,
                    displayValue: brand.brandType
                }
            });

            let states = this.state.loadedStates.map(state =>{
                if(this.state.stateID === 0 && state.stateType === this.props.equipment.stateID) {
                    this.state.stateID =  state.id_state;
                }
                return{
                    value: state.id_state,
                    displayValue: state.stateType
                }
            });
            console.log("cat out: " + this.state.categoryID);
            this.changeFormState(categories,brands,states);
    
        }
    }


    changeFormState(categories, brands,states){
        const UPDATE = (this.props.function == 'UPDATE') ? true : false;
        this.setState({form : {
            ...this.state.form,
            category : SelectElement(categories, (UPDATE)?this.state.categoryID:'', 'category','Categoria'),
            brand : SelectElement( brands,(UPDATE)?this.state.brandID:'','brand', "Marca"),
            state : SelectElement(states,(UPDATE)?this.state.stateID:'','state', "Estado")
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

const mapStateToProps = (state) => {
    return {
        equipment: state.equipmentReducer,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EquipmentForm);

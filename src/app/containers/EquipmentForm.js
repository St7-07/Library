import React from "react";
import { connect } from 'react-redux';

import "../styles/Form.css";
import { Input, InputElement, SelectElement, InputChangedHandler, checkValidity, updateObject } from "../components/FormsUI/Input";
import axios from 'axios';
import BootModal from '../components/FormsUI/BootModal';
import BootAlert from "../components/FormsUI/BootAlert";

class EquipmentForm extends React.Component {

    constructor(props) {
        super();
        const UPDATE = (props.function == 'UPDATE') ? true : false;
        this.state = {
            old_barcode: (UPDATE) ? props.equipment.barcode : '',
            old_model: (UPDATE) ? props.equipment.model : '',
            categoryID: 0,
            brandID: 0,
            stateID: 0,
            form: {
                barcode: InputElement('text', 'Nombre', (UPDATE) ? props.equipment.barcode : ''
                    , "barcode", "Codigo Barras", true, false, 5, 20,false),

                category: SelectElement([
                    { value: '1', displayValue: 'toDeploy' },]
                    , '', 'category', "Categoria",true),

                model: InputElement('text', 'Modelo', (UPDATE) ? props.equipment.model : ''
                    , "model", "Modelo", true, false, 5, 20,false),

                brand: SelectElement([
                    { value: '1', displayValue: 'VAIO' },
                    { value: '2', displayValue: 'Apple' }]
                    , '', 'brand', "Marca",true),

                state: SelectElement([
                    { value: '1', displayValue: 'Prestada' },
                    { value: '2', displayValue: 'Disponible' }]
                    , '', 'state', "Estado",true)
            },
            loadedCategories: null,
            loadedBrands: null,
            loadedStates: null,
            formIsValid: false
        };
    }

    resetFields() {
        this.setState({
            form: {
                ...this.state.form,
                barcode: InputElement('text', 'Nombre', ''
                    , "barcode", "Codigo Barras"),
                model: InputElement('text', 'Modelo', ''
                    , "model", "Modelo")
            }
        });
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
                        document.getElementById('alert').hidden = false;
                        this.resetFields();
                    });
                break;
            case 'UPDATE':
                let data = {
                    ...formData,
                    old_barcode: this.state.old_barcode,
                    old_model: this.state.old_model
                };
                axios.put('http://localhost:8080/av_equipments/av_equipment/' + data.old_barcode, data)
                    .then(response => {
                        document.getElementById('alert').hidden = false;
                        this.resetFields();
                    });
                break;
        }
    }

    renderData() {
        const UPDATE = (this.props.function == 'UPDATE') ? true : false;

        axios.get('http://localhost:8080/av_equipments/categories')
            .then(response => {
                this.setState({ loadedCategories: response.data });
                let categories = this.state.loadedCategories.map(category => {
                    if (this.state.categoryID === 0 && category.category === this.props.equipment.category) {
                        this.state.categoryID = category.id_category;
                    }
                    return {
                        value: category.id_category,
                        displayValue: category.category
                    }
                });

                this.setState({
                    form: {
                        ...this.state.form,
                        category: SelectElement(categories, (UPDATE) ? this.state.categoryID : 1, 'category', 'Categoria')
                    }
                });
            });

        axios.get('http://localhost:8080/av_equipments/brands')
            .then(response => {
                this.setState({ loadedBrands: response.data });
                let brands = this.state.loadedBrands.map(brand => {
                    if (this.state.brandID === 0 && brand.brandType === this.props.equipment.brand) {
                        this.state.brandID = brand.id_brand;
                    }
                    return {
                        value: brand.id_brand,
                        displayValue: brand.brandType
                    }
                });
                this.setState({
                    form: {
                        ...this.state.form,
                        brand: SelectElement(brands, (UPDATE) ? this.state.brandID : 1, 'brand', "Marca")
                    }
                });
            });

        axios.get('http://localhost:8080/av_equipments/states')
            .then(response => {
                this.setState({ loadedStates: response.data });
                let states = this.state.loadedStates.map(state => {
                    if (this.state.stateID === 0 && state.stateType === this.props.equipment.stateID) {
                        this.state.stateID = state.id_state;
                    }
                    return {
                        value: state.id_state,
                        displayValue: state.stateType
                    }
                });
                this.setState({
                    form: {
                        ...this.state.form,
                        state: SelectElement(states, (UPDATE) ? this.state.stateID : 1, 'state', "Estado")
                    }
                });
            });
    }

    componentWillMount() {
        this.renderData();
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
                                    invalid={!formElement.config.valid}
                                    shouldValidate={formElement.config.validation}
                                    touched={formElement.config.touched}
                                    //changed={(event) => this.setState({form: InputChangedHandler(event, formElement.id, this.state)})}
                                    changed={(event) => this.inputChangedHandler(event, formElement.id)}
                                />
                            ))}

                            <div className="col-sm-4">
                                <br />
                                <button disabled={(this.props.function === 'CREATE')?!this.state.formIsValid : this.state.formIsValid} type="submit" className="btn btn-primary">{(this.props.function === 'CREATE') ? "Crear" : "Actualizar"}</button>
                            </div>
                        </div>
                    </form>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <BootModal modalID="cat" name="category" label="Categoria" url="av_equipments/category"
                        renderData={this.renderData.bind(this)} />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <BootModal modalID="brand" name="brand" label="Marca" url="av_equipments/brand"
                        renderData={this.renderData.bind(this)} />

                </div>
                <br />
                <BootAlert id="alert" title="Exito!" message="La operacion ha sido realizada." />
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
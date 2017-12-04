import React from "react";
import { connect } from 'react-redux';

import "../styles/Form.css";
import { Input, InputElement, SelectElement, InputChangedHandler } from "../components/FormsUI/Input";
import axios from 'axios';
import BootModal from '../components/FormsUI/BootModal';
import BootAlert from "../components/FormsUI/BootAlert";
import { BootBar } from "../components/FormsUI/BootBar";

class StatisticsForm extends React.Component {

    constructor(props) {
        super();
        this.state = {
            total: 0,
            totalDelinquencies: 0,
            form: {
                category: SelectElement([
                    { value: '1', displayValue: 'toDeploy' },]
                    , '', 'category', "Categoria"),
            },
            loadedCategories: null,
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
        updatedFormElement.touched = true;
        updatedForm[inputIdentifier] = updatedFormElement;
        this.setState({ form: updatedForm });
    }


    renderData() {

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
                        category: SelectElement(categories, 1, 'category', 'Categoria')
                    }
                });
            });
    }

    componentWillMount() {
        this.renderData();
    }

    calculateStatistics() {
        console.log("calculandoStadisticas");


        const id = this.state.form.category.value;
        axios.get('http://localhost:8080/statistics/' + id)
            .then(response => {
                this.setState({ total: response.data[0].Total })
            });

        axios.get('http://localhost:8080/statistics/delinquenciesStatistics/' + id)
            .then(response => {
                this.setState({ totalDelinquencies: response.data[0].totalDelinquencies })
            });

    }

    render() {
        const formElementsArray = [];

        for (let key in this.state.form) {
            formElementsArray.push({
                id: key,
                config: this.state.form[key]
            });
        }

        console.log("mostrando stadisticas ");


        return (
            <div className="formSpace">
                <div className="row">

                    <form id="formStatistics" onSubmit={(event) => this.onSubmitHandler(event)}>
                        <div className="col-md-2">
                            {formElementsArray.map(formElement => (
                                <Input
                                    key={formElement.id}
                                    elementType={formElement.config.elementType}
                                    elementConfig={formElement.config.elementConfig}
                                    value={formElement.config.value}
                                    label={formElement.config.label}
                                    changed={(event) => this.inputChangedHandler(event, formElement.id, this.state)}
                                />
                            ))}
                            <div className="col-md-4">
                                <br />
                                <button type="button" onClick={() => this.calculateStatistics()} className="btn btn-primary">{"Calcular Prestamos"}</button>
                            </div>
                        </div>
                    </form>
                    <div className="col-md-5"><BootBar color={"GREEN"} average={this.state.total} total={this.state.total} innerText={this.state.total} label={"Prestamos totales:"} /></div>
                    <div className="col-md-5"><BootBar color={"LIGHTBLUE"} average={(this.state.total / 6)} innerText={(this.state.total / 6).toFixed(2)} total={this.state.total} label={"Prestamos por mes:"} /></div>
                    <div className="col-md-5"><BootBar color={"RED"} average={(this.state.total) / 182} innerText={(this.state.total / 182).toFixed(2)} total={this.state.total} label={"Prestamos por dia:"} /></div>
                </div>
                <div className="row">
                    <div className="col-md-5 col-md-offset-2"><BootBar color={"GREEN"} average={this.state.totalDelinquencies} total={this.state.totalDelinquencies} innerText={this.state.totalDelinquencies} label={"Morosidades totales:"} /></div>
                    <div className="col-md-5"><BootBar color={"LIGHTBLUE"} average={(this.state.totalDelinquencies / 6)} innerText={(this.state.totalDelinquencies / 12).toFixed(2)} total={this.state.totalDelinquencies} label={"Morosidades por mes:"} /></div>
                    <div className="col-md-5 col-md-offset-2"><BootBar color={"RED"} average={(this.state.totalDelinquencies) / 182} innerText={(this.state.totalDelinquencies / 182).toFixed(2)} total={this.state.totalDelinquencies} label={"Morosidades por dia:"} /></div>
                </div>
                <br />

                <br />
                <br />
                <br />
                <br />

                <br />
                <br />
                <br />
                <br />
                <br />


                <br />
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

export default connect(mapStateToProps, mapDispatchToProps)(StatisticsForm);
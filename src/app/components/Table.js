import React, {Component} from 'react';
import SpicyDatatable from 'spicy-datatable';
import "../styles/spicyTable.css";
import axios from 'axios';
import Modal from './Modal'

class Table extends Component {

    state = {
        loadedData : null,
        selectedData: null,
    }

    dataRouteHandler = () => {
        console.log("Sends: "+this.props.tableType);
        let route = '';
        switch(this.props.tableType){
            case 'students':
                route ='applicants/students';
            break;

            case 'clerks':
            route = 'applicants/clerks';
            break;

            case 'av_equipment':
                route = 'av_equipments';
            break;

            case 'loans':
                route='loans';
            break;

            case 'defaulters':
                route ='defaulters';
            break;
        }
        return route;
    }

    columnsHandler = () => {
        let columns = [];
        switch(this.props.tableType){
            case 'students':
             columns =
                    [{
                        key: 'button',
                             label: '',
                        },{
                        key: 'id',
                             label: 'Cedula',
                           }, 
                           {
                            key: 'studentId',
                            label: 'Carnet',
                            },
                            {
                             key: 'name',
                             label: 'Nombre',
                            }, 
                            {
                             key: 'lastname',
                             label: 'Apellidos',
                           },
                           {
                             key: 'email',
                             label: 'Email',
                           },
                            {
                            key: 'phoneHome',
                            label: 'Telefono Casa',
                            },
                            {
                            key: 'phone',
                            label: 'Celular',
                            },
                            {
                            key: 'career',
                            label: 'Carrera',
                            },
                            {
                            key: 'validDate',
                            label: 'Fecha validez',
                            },
                            {
                            key: 'address',
                            label: 'Direccion',
                            }
                            ];
            break;

            case 'clerks':
            columns =
                [{
                    key: 'id',
                    label: 'Cedula',
                  }, {
                    key: 'name',
                    label: 'Nombre',
                  }, {
                    key: 'lastname',
                    label: 'Apellidos',
                  },
                  {
                    key: 'phone',
                    label: 'Telefono',
                  },
                  {
                    key: 'homePhone',
                    label: 'Telefono Casa',
                  },
                  {
                    key: 'department',
                    label: 'Departamento',
                  },
                  {
                    key: 'position',
                    label: 'Posicion',
                  },
                  {
                    key: 'validDate',
                    label: 'Fecha validez',
                  },
                  {
                    key: 'address',
                    label: 'Direccion',
                  }];
            break;

            case 'av_equipment':
               columns =
                    [{
                        key: 'barcode',
                        label: 'Codigo de barra',
                    },
                    {
                        key: 'category',
                        label: 'Categoria',
                    },
                    {
                        key: 'brand',
                        label: 'Marca',
                    },
                    {
                        key: 'model',
                        label: 'Modelo',
                    },
                    {
                        key: 'state',
                        label: 'Estado',
                    }
                    ];
            break;

            case 'loans':
            columns=
                [
                    {
                        key: 'barcode',
                        label: 'Codigo de Barras',
                    },
                    {
                    key: 'id',
                    label: 'Cedula',
                },
                {
                    key: 'name',
                    label: 'Nombre',
                },
                {
                    key: 'lastname',
                    label: 'Apellidos',
                },
                {
                    key: 'loanDate',
                    label: 'Fecha Prestamo',
                },
                {
                    key: 'returnDate',
                    label: 'Fecha Retorno',
                },
                {
                    key: 'returnedDate',
                    label: 'Fecha Devuelto',
                }
                ];
            break;

            case 'defaulters':
            columns =
                [

                {
                    key: 'barcode',
                    label: 'Codigo de Barras',
                },
                {
                    key: 'id',
                    label: 'Cedula',
                },
                {
                    key: 'name',
                    label: 'Nombre',
                },
                {
                    key: 'lastname',
                    label: 'Apellidos',
                },
                {
                    key: 'delqDate',
                    label: 'Fecha Creación',
                },
                {
                    key: 'numDays',
                    label: 'Numero de dias',
                },
                {
                    key: 'loanStartDate',
                    label: 'Inicio Prestamo',
                },
                {
                    key: 'loanFinishDate',
                    label: 'Fecha Fin Prestamo',
                },
                {
                    key: 'loanReturnedDate',
                    label: 'Fecha Entrega Prestamo',
                }];
            break;
        }
        return columns;
    }

    rowsHandler = () => {
        let rows = [];
        if(this.state.loadedData){
            switch(this.props.tableType){
                case 'students':
                rows = this.state.loadedData.map(row => {
                    return{
                        id: row.identification,
                        name:row.name,
                        lastname: row.lastname,
                        email: row.email,
                        phone:row.tel,
                        phoneHome:row.cel,
                        career: row.career,
                        validDate:row.expireDate,
                        address: row.address,
                        onClickHandler: this.optionSelectedHandler
                    }
                });
                console.log(this.state.loadedData[0].expireDate);
                break;
                
                case 'clerks':
                rows = this.state.loadedData.map(row => {
                    return{
                        id: row.identification,
                        name:row.name,
                        lastname: row.lastname,
                        email: row.email,
                        phone:row.tel,
                        phoneHome:row.cel,
                        department:row.department,
                        position:row.position,
                        validDate: row.expireDate,
                        address: row.address
                    }
                });
                break;

                case 'av_equipment':
                rows = this.state.loadedData.map(row => {
                    return{
                        barcode: row.barcode,
                        category:row.category,
                        brand: row.brandType,
                        model: row.Model,
                        state: row.stateType
                    }
                }); 
                break;
    
                case 'loans':
                rows = this.state.loadedData.map(row => {
                    return{
                        id: row.identification,
                        name:row.name,
                        lastName: row.lastName,
                        studentId: row.carnet,
                        productId: row.barcode,
                        loanDate: row.loanStartDate,
                        returnDate: row.loanFinishDate,
                        returnedDate: row.returnedDate
                    }
                });
                break;
    
                case 'defaulters':
                rows = this.state.loadedData.map(row => {
                    return{
                        id: row.id,
                        name:row.name,
                        lastName: row.lastName,
                        barcode: row.barcode,
                        category: row.category,
                        numDays: row.numDays,
                        delqDate: row.date,
                        loanStartDate: row.loanStartDate,
                        loanFinishDate: row.loanFinishDate,
                        loanReturnedDate: loanReturnedDate
                    }
                });
                break;
            }
        }
        return rows;
    }

    //la opcion de onClickHandler que trae spicy por defecto envia un event, un row y el index
    //Es solo de recibirlos como params en la function handler
    //Hace que el state sea toda la info de la row (como objeto) y muestra el modal
    optionSelectedHandler = (event, row, index) => {
        this.setState({selectedData:row});
        $('#myModal').modal('show');
    }

    // componentDidMount(){ 
    //     let route = this.dataRouteHandler();
    //     console.log("Route"+route)
    //     if(!this.state.loadedData)  {
    //         axios.get('http://localhost:8080/'+ route)
    //         .then(response => {
    //             this.setState({loadedData:response.data});
    //         });
    //     }

        
    // }

    componentDidUpdate(prevState){
        console.log("HIZO UPDATE TABLE...Prev: "+prevState.tableType
    +" Table type: "+this.props.tableType)
        if(prevState.tableType !== this.props.tableType){
            let route = this.dataRouteHandler();
            console.log("Entra:"+route);
            axios.get('http://localhost:8080/'+ route)
            .then(response => {
                this.setState({loadedData:response.data});
            });
        }
    }

    
    refresh() {
         let route = this.dataRouteHandler();
            console.log("Entra:"+route);
            axios.get('http://localhost:8080/'+ route)
            .then(response => {
                this.setState({loadedData:response.data});
            });
    }

    render(){
       
        const key = 'tableTest';
        const config ={
            searchLabel: 'Buscar:',
            searchPlaceholder: ' ',
            nextPageLabel: '->',
            previousPageLabel: '<-',
            itemsPerPageLabel: 'Numero de entradas',
            entryCountLabels: ['Mostrando', 'a','de','entradas'],
            itemsPerPageOptions: [5]
        }

        let columns = this.columnsHandler();
        let rows= this.rowsHandler();
        let modal = null;

        //Este if hace que si el state es nulo(no se han seleccionado datos) no cargue ningún modal 
        if(this.state.selectedData){
            modal = <Modal
                    selectedData = {this.state.selectedData}
                    refresh = {this.refresh.bind(this)}
                   />          
        }
        
        return (
            <div className='row'>
                <div className='col-xs-10 col-xs-offset-1'>
                    <SpicyDatatable
                    tableKey={key} 
                    columns={columns}
                    rows={rows}
                    config={config}
                    />
                </div>
                {modal}
            </div>
        );
    }
}

export default Table;
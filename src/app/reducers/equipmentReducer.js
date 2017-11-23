const initState = {
    id_AV:'',
    form: {
        barcode : inputElement('text', 'Nombre', '', "barcode"),
        notes: inputElement('text', 'Notas', '', 'notes'),

        category : selectElement( [
                    {value:'1', displayValue: 'Laptop'},
                    {value:'2', displayValue: 'Video Beam'}]
                    ,'','category'),

        model : selectElement( [
                    {value:'1', displayValue: '12321'},
                    {value:'2', displayValue: 'fsdfsd'}]
                     ,'','model'),

        brand : selectElement( [
                   {value:'1', displayValue: 'VAIO'},
                   {value:'2', displayValue: 'Apple'}]
                    ,'','brand'),

        state : selectElement( [
                    {value:'1', displayValue: 'Prestada'},
                    {value:'2', displayValue: 'Disponible'}]
                    ,'','state')
    }
};

function inputElement( type, placeholder, value, name) {
    return {
        elementType: 'input',
        elementConfig: {
            type: type,
            placeholder: placeholder,
            name: name,
            id: name
        },
        value:value
    };
}

 function selectElement( options, value, name) {
    return {
        elementType: 'select',
        elementConfig: {
            options: options,
            name: name,
            id: name
        },
        value:value
    };
}

const equipmentReducer = (state = initState, action) => {
    switch (action.type) {
        case "CREATE_EQUIPMENT":

            break;
        case "UPDATE_EQUIPMENT":
            
            break;
        case "CHANGE_VALUE" :
        //Inmutability, deep copy
            const updatedform = { //Copy of form element
                ...state.form
            };
            const updatedFormElement = { //Copy of just the updated element
                ...updatedform[action.payload.inputIdentifier]
            };
            updatedFormElement.value = action.payload.value; //Update value property inside element
            updatedform[action.payload.inputIdentifier] = updatedFormElement; //Update element changed inside form element
            state = {//Copy state because of ID is the same
                ...state,
                form: updatedform
            }
            break;
        default:
            break;
    }
    return state; 
};

export default equipmentReducer;
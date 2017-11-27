const initState = {
    model : '',
    brand : '',
    category: '', 
    barcode :'',
    stateID:''
};

const equipmentReducer = (state = initState, action) => {
    switch (action.type) {
        case "SET_EQUIPMENT_INFO":
            state = {
                ...state,
                model : action.payload.model,
                brand : action.payload.brand,
                category : action.payload.category,
                barcode : action.payload.barcode,
                stateID : action.payload.state
            }
            break;
        default:
            break;
    }
    return state; 
};

export default equipmentReducer;
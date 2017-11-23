const initState = {
    id_AV:''
};

const equipmentReducer = (state = initState, action) => {
    switch (action.type) {
        case "CREATE_EQUIPMENT":

            break;
        case "UPDATE_EQUIPMENT":
            
            break;
        case "CHANGE_VALUE" :
        // //Inmutability, deep copy
        //     const updatedform = { //Copy of form element
        //         ...state.form
        //     };
        //     const updatedFormElement = { //Copy of just the updated element
        //         ...updatedform[action.payload.inputIdentifier]
        //     };
        //     updatedFormElement.value = action.payload.value; //Update value property inside element
        //     updatedform[action.payload.inputIdentifier] = updatedFormElement; //Update element changed inside form element
        //     state = {//Copy state because of ID is the same
        //         ...state,
        //         form: updatedform
        //     }
            break;
        default:
            break;
    }
    return state; 
};

export default equipmentReducer;
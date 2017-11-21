
const sectionReducer = (state = {
    actualSection : "Prestamos",
    subcontent: ""
},action) => {
    switch (action.type) {
        case "SET_SECTION":
            state = {
                ...state,
                actualSection : action.payload
            }
            break;
        case "SET_SUBCONTENT":
            console.log(action.payload);
                state = {
                    ...state,
                    subcontent: action.payload
                } 
        break;
        default:
            break;
    }
    return state; 
}

export default sectionReducer;
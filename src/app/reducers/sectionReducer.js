
const sectionReducer = (state = {
    actualSection : "Prestamos",
    subcontent: "applicantForm"
},action) => {
    switch (action.type) {
        case "SET_SECTION":
            state = {
                ...state,
                actualSection : action.payload.section,
                subcontent : action.payload.subcontent
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
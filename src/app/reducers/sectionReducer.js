
const sectionReducer = (state = {
    actualSection : "Prestamos"
},action) => {
    switch (action.type) {
        case "SET_SECTION":
            state = {
                actualSection : action.payload
            }
            break;
        default:
            break;
    }
    return state; 
}

export default sectionReducer;
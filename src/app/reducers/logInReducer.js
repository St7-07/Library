
const logInReducer = (state = {
    typeUser : "none",
    name : ""
}, action) => {
    switch (action.type) {
        case "SET_TYPE":
        console.log(action.payload);
            switch (action.payload.typeUser) {
                case "Administrator":
                    state = {
                        typeUser: action.payload.typeUser,
                        name : ""
                    }
                    break;
                case "NormalUser":
                    state = {
                        typeUser: action.payload.typeUser,
                        name: action.payload.name
                    }
                    
                    break;
                default:
                    break;
            }
            break;
        default:
            break;
    }
    return state;
}

export default logInReducer;
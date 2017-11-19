export function setType(type,name) {
    return {
        type: "SET_TYPE",
        payload: {typeUser: type ,
        name: name}
    };
} 


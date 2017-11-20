const initState = {
    dataType: "students",
    loadedData : null,
    selectedData: null
};

const tableReducer = (state = initState, action) => {
    switch(action.type){
        case 'CHANGE_DATA_TYPE':
            state= {
                ...state,
                dataType : action.payload
            }
        break;
    }
    return state;
}

export default tableReducer;
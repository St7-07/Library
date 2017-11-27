const initState = {
    dataType: "",
    loadedData : null,
    selectedData: null,
    numberRows: 0
};

const tableReducer = (state = initState, action) => {
    switch(action.type){
        case 'CHANGE_DATA_TYPE':
            state= {
                ...state,
                dataType : action.payload
            }
        break;
        case 'CHANGE_ROW_NUMBER':
        state= {
            ...state,
            numberRows : action.payload
        }
    break;
    }
    return state;
}

export default tableReducer;
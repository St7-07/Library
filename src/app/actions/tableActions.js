export function setDataType(dataType){
    return{
        type: "CHANGE_DATA_TYPE",
        payload: dataType
    }
}
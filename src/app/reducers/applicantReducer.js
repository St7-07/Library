const initState = {
    applicantType: "STUDENT",
    //Person Attributes
        ID : 0,
        identification : "",
        name : "", 
        lastname: "",
        email: "", 
        tel: "",
        cel: "",
        expireDate: null, 
        districtID: 0,
        signals: "",
        locationID: 0,
    //Student attributes
        career: "",
        studentID: "",
    //Clerk attributes
        clerkID: 0,
        department: "",
        position: ""
};

const applicantReducer = (state = initState, action) => {
    switch (action.type) {
        case "CHANGE_APPLICANT_TYPE":
            state = {
                ...state,
                applicantType : action.payload
            }
            break;
        default:
            break;
    }
    return state; 
};

export default applicantReducer;
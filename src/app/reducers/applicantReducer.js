const initState = {
    applicantType: "STUDENT",
    //Person Attributes
    ID: 0,
    identification: "",
    name: "",
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
                applicantType: action.payload
            }
            return state;
            break;
        case "SET_APPLICANT_INFO":
            if (state.applicantType == "STUDENT") {
                state = {
                    ...state,
                    ID: 0,
                    identification: action.payload.id,
                    name: action.payload.name,
                    lastname: action.payload.lastname,
                    email: action.payload.email,
                    tel: action.payload.homePhone,
                    cel: action.payload.phone,
                    expireDate: (action.payload.validDate.split("/").reverse().join("-")),
                    district: action.payload.district,
                    signals: "",
                    location: action.payload.location,
                    //Student attributes
                    career: action.payload.career,
                    studentID: action.payload.studentId,
                    //Clerk attributes
                    clerkID: 0,
                    department: "",
                    position: ""
                }
            } else {
             
                state = {
                    ...state,
                    ID: 0,
                    identification: action.payload.id,
                    name: action.payload.name,
                    lastname: action.payload.lastname,
                    email: action.payload.email,
                    tel: action.payload.homePhone,
                    cel: action.payload.phone,
                    expireDate:  (action.payload.validDate.split("/").reverse().join("-")),
                    district: action.payload.district,
                    signals: "",
                    location: action.payload.location,
                    //Student attributes
                    career: "",
                    studentID: "",
                    //Clerk attributes
                    clerkID: 0,
                    department: action.payload.department,
                    position: action.payload.position
                }
            }

            break;
        default:
            break;
    }
    return state;
};

export default applicantReducer;
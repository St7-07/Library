import {createStore,combineReducers} from "redux";
import thunk from "redux-thunk"
import userReducer from "./reducers/userReducer";
import sectionReducer from "./reducers/sectionReducer";
import logInReducer from "./reducers/logInReducer";
import applicantReducer from "./reducers/applicantReducer";
import tableReducer from './reducers/tableReducer';
import { applyMiddleware } from "redux";

export default createStore(
    combineReducers({sectionReducer, logInReducer, applicantReducer,tableReducer}), {},
    applyMiddleware(thunk)
 );
 
 
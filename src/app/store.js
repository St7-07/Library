import {createStore,combineReducers} from "redux";
import thunk from "redux-thunk"
import userReducer from "./reducers/userReducer";
import sectionReducer from "./reducers/sectionReducer";
import logInReducer from "./reducers/logInReducer";
import { applyMiddleware } from "redux";

export default createStore(
    combineReducers({sectionReducer, logInReducer}), {},
    applyMiddleware(thunk)
 );
 
 
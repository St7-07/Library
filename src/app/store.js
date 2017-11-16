import {createStore,combineReducers} from "redux";
import thunk from "redux-thunk"
import userReducer from "./reducers/userReducer";
import { applyMiddleware } from "redux";

export default createStore(
    combineReducers({userReducer}), {},
    applyMiddleware(thunk)
 );
 
 
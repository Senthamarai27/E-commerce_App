import { createStore } from "redux";
import { dataReducer, pageReducer  } from "./reducers/reduxReducers";
import { combineReducers } from "redux";

// Using CombineReducers to use multiple reducers 
const result = combineReducers({
    dataR : dataReducer,
    pageR : pageReducer,
})

// Creating the store
export const store = createStore(result)
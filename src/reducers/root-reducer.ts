import { combineReducers } from "redux";
import appStateReducer from "./app-reducer";
import { dishReducer } from "./host-dishes-reducer";
import { verificationReducer } from "./registration-reducer";

const rootReducer = combineReducers({registration: verificationReducer, appState: appStateReducer, dishes: dishReducer})

export default rootReducer;
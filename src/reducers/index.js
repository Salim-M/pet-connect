import { combineReducers } from "redux";
import { loadingBarReducer } from "react-redux-loading-bar";

import authReducer from "./authReducer";
import errorReducer from './errorReducer';

const reducer = combineReducers({
    loadingBar: loadingBarReducer,
    auth: authReducer,
    error: errorReducer
});

export default reducer;
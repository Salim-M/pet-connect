import { combineReducers } from "redux";
import { loadingBarReducer } from "react-redux-loading-bar";

import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import listingsReducer from "./listingsReducer";

const reducer = combineReducers({
  loadingBar: loadingBarReducer,
  auth: authReducer,
  // error: errorReducer,
  listings: listingsReducer,
});

export default reducer;

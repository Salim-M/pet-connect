import {
  AUTH_FAILED,
  AUTH_LOADING,
  AUTH_SUCCESS,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  USER_LOADING,
  UPDATE_USER,
} from "../actions/types";

const token = localStorage.getItem("token");
const initialState = {
  isLoading: true,
  isAuthenticated: false,
  user: null,
  token,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_LOADING:
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case AUTH_SUCCESS:
      localStorage.setItem("token", action.payload.access_token);
      return {
        ...state,
        token: action.payload.access_token,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
        isAuthenticated: true,
      };
    case AUTH_FAILED:
    case LOGIN_FAILED:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    // User specific actions
    case UPDATE_USER:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      };

    default:
      return state;
  }
};

export default authReducer;

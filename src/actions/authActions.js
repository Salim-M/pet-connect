import { hideLoading, showLoading } from "react-redux-loading-bar";
import { toast } from "react-toastify";
import PetConnectApi from "../apis/PetConnectApi";
import {
  AUTH_FAILED,
  AUTH_LOADING,
  AUTH_SUCCESS,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGOUT,
  LOGOUT_FAILED,
  LOGOUT_SUCCESS,
  USER_LOADING,
} from "./types";

const userLoading = () => ({
  type: USER_LOADING,
});

const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});

const logoutFailed = () => ({
  type: LOGOUT_FAILED,
});

const authLoading = () => ({
  type: AUTH_LOADING,
});

const authSuccess = (payload) => ({
  type: AUTH_SUCCESS,
  payload,
});

export const authFailed = () => ({
  type: AUTH_FAILED,
});

const loginFailed = () => ({
  type: LOGIN_FAILED,
});

const loginSuccess = (payload) => ({
  type: LOGIN_SUCCESS,
  payload,
});

export const loadUser = () => (dispatch, getState) => {
  dispatch(userLoading());
  dispatch(showLoading());

  const token = getState().auth.token;

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  PetConnectApi.get("/user", config)
    .then((res) => {
      dispatch(loginSuccess(res.data));
      PetConnectApi.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
    })
    .catch((err) => {
      dispatch(loginFailed());
    })
    .finally(() => dispatch(hideLoading()));
};

export const login = (values, actions) => (dispatch, getState) => {
  dispatch(authLoading());
  PetConnectApi.post("/auth/login", values)
    .then((res) => {
      dispatch(authSuccess(res.data));
      dispatch(loadUser());
    })
    .catch((err) => {
      const { data, status } = err.response;
      if (status === 401) {
        toast.error("Please check your credentials, and try again");
      } else if (status === 422) {
        for (let key in data) {
          actions.setFieldError(key, data[key][0]);
        }
      }
      dispatch(authFailed());
    })
    .finally(() => actions.setSubmitting(false));
};

export const register = (values, actions) => (dispatch, getState) => {
  dispatch(showLoading());
  PetConnectApi.post("/auth/register", values)
    .then((res) => {
      toast.success("You have been registered successfully!");
      actions.resetForm();
    })
    .catch((err) => {
      const { data, status } = err.response;
      if (status === 401) {
        toast.error("Something went wrong! Please try again later");
      } else if (status === 422) {
        for (let key in data) {
          actions.setFieldError(key, data[key][0]);
        }
      }
    })
    .finally(() => {
      actions.setSubmitting(false);
      dispatch(hideLoading());
    });
};

export const logout = () => (dispatch) => {
  dispatch(showLoading());
  dispatch({ type: LOGOUT });

  PetConnectApi.post("/user/logout")
    .then(() => {
      dispatch(logoutSuccess());
    })
    .catch(() => {
      dispatch(logoutFailed());
    })
    .finally(() => {
      dispatch(hideLoading());
    });
};

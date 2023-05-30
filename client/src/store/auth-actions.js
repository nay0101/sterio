import {
  loginStart,
  loginSuccess,
  loginFailure,
  logoutStart,
  registerStart,
  registerSuccess,
  registerFailure,
} from "./auth-slice";
import { publicRequest } from "../request-methods";

export const login = (user) => {
  return async (dispatch) => {
    dispatch(loginStart());
    try {
      const response = await publicRequest.post("/auth/login", user);
      dispatch(loginSuccess(response.data));
    } catch (err) {
      dispatch(loginFailure());
    }
  };
};

export const register = (user) => {
  return async (dispatch) => {
    dispatch(registerStart());
    try {
      const response = await publicRequest.post("/auth/register", user);
      dispatch(registerSuccess(response.data));
    } catch (err) {
      dispatch(registerFailure);
    }
  };
};

export const logout = () => {
  return (dispatch) => {
    dispatch(logoutStart());
  };
};

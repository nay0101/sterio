import {
  loginStart,
  loginSuccess,
  loginFailure,
  logoutStart,
} from "./admin-slice";
import { publicRequest } from "../request-methods";

export const login = (user) => {
  return async (dispatch) => {
    dispatch(loginStart());
    try {
      const response = await publicRequest.post("/admin/login", user);
      dispatch(loginSuccess(response.data));
    } catch (err) {
      dispatch(loginFailure());
    }
  };
};

export const logout = () => {
  return (dispatch) => {
    dispatch(logoutStart());
  };
};

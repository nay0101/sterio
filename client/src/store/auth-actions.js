import {
  loginStart,
  loginSuccess,
  loginFailure,
  logoutStart,
  registerStart,
  registerSuccess,
  registerFailure,
  subscribeSuccess,
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
      const response = await publicRequest.post("/auth/signup", user);
      dispatch(registerSuccess(response.data));
    } catch (err) {
      dispatch(registerFailure());
    }
  };
};

export const logout = () => {
  return (dispatch) => {
    dispatch(logoutStart());
  };
};

export const subscribe = ({
  tokenID,
  price,
  user_id,
  subscription_duration,
  subscription_fees,
}) => {
  return async (dispatch) => {
    try {
      await publicRequest.post("/payment", {
        tokenId: tokenID,
        amount: price * 100,
      });
      const response = await publicRequest.put("/subscription", {
        user_id,
        subscription_duration,
        subscription_fees,
      });
      dispatch(subscribeSuccess(response.data));
    } catch (err) {
      console.log(err);
    }
  };
};

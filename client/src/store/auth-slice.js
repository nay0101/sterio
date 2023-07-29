import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  isFetching: false,
  error: false,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart(state) {
      state.isFetching = true;
    },
    loginSuccess(state, action) {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailure(state) {
      state.isFetching = false;
      state.error = true;
    },
    registerStart(state) {
      state.isFetching = true;
    },
    registerSuccess(state, action) {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    registerFailure(state) {
      state.isFetching = false;
      state.error = true;
    },
    logoutStart(state) {
      state.isFetching = false;
      state.currentUser = null;
      state.error = false;
    },
    subscribeSuccess(state, action) {
      state.currentUser = action.payload;
    },
    subscribeFail(state) {
      state.error = true;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logoutStart,
  registerStart,
  registerFailure,
  registerSuccess,
  subscribeSuccess,
  subscribeFail,
} = authSlice.actions;

export default authSlice;

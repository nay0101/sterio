import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  isFetching: false,
  error: false,
};
const adminSlice = createSlice({
  name: "admin",
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
    logoutStart(state) {
      state.isFetching = false;
      state.currentUser = null;
      state.error = false;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logoutStart } =
  adminSlice.actions;

export default adminSlice;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tab: "home",
};

const dashboardSlice = createSlice({
  name: "tab",
  initialState,
  reducers: {
    changeTab(state, action) {
      state.tab = action.payload.tab;
    },
  },
});

export const { changeTab } = dashboardSlice.actions;
export default dashboardSlice;

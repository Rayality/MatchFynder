import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
};

const loginSlice = createSlice({
  name: "loginInfo",
  initialState,
  reducers: {
    updated(state, val) {
      state.token = val;
    },
  },
});

export const { updated } = loginSlice.actions;
export default loginSlice.reducer;

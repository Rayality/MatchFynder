import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    username: "",
    password: "",
  },
};

const loginSlice = createSlice({
  name: "loginInfo",
  initialState,
  reducers: {
    updated(state, val) {
      state.value[val.payload[0]] = val.payload[1];
    },
    reset(state) {
      state.value = {
        username: "",
        password: "",
      };
    },
  },
});

export const { updated, reset } = loginSlice.actions;
export default loginSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  account: {
    username: "",
    password: "",
  },
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    reset(state) {
      state.account = {
        account: "",
        password: "",
      };
    },
    setUsername(state, val) {
      state.account.username = val.payload[0]
    },
    setPassword(state, val) {
      state.account.password = val.payload[0]
    }
  },
});

export const { updated, reset, setPassword, setUsername } = accountSlice.actions;
export default accountSlice.reducer;

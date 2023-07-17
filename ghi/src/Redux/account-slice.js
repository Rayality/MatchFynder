import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  value: {
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    confirmPassword: "",
  },
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    updated(state, val) {
      state.value[val.payload[0]] = val.payload[1];
    },
    reset(state) {
      state.value = {
        username: "",
        email: "",
        first_name: "",
        last_name: "",
        password: "",
        confirmPassword: "",
      };
    },
  },
});

export const { updated, reset } = accountSlice.actions;
export default accountSlice.reducer;
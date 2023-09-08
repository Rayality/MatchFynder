import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    isSwitched: false,
    isShown: false,
  },
};

const modalSlice = createSlice({
  name: "modalCheck",
  initialState,
  reducers: {
    clicked(state) {
      state.value.isSwitched = !state.value.isSwitched;
    },
    shown(state) {
      state.value.isShown = !state.value.isShown;
    },
  },
});

export const { clicked, shown } = modalSlice.actions;
export default modalSlice.reducer;

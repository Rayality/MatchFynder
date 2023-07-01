import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./account-slice";

export const store = configureStore({
  reducer: {
    updater: accountReducer,
  },
});

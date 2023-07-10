import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./account-slice";
import loginReducer from "./login-slice";

export const store = configureStore({
  reducer: {
    accountCreator: accountReducer,
    accountLogin: loginReducer,
  },
});

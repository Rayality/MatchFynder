import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./account-slice";
import loginReducer from "./login-slice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { optionsApi } from "./optionsApi";

export const store = configureStore({
  reducer: {
    accountCreator: accountReducer,
    accountLogin: loginReducer,
    [optionsApi.reducerPath]: optionsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(optionsApi.middleware),
});

setupListeners(store.dispatch);

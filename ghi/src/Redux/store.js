import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./account-slice";
import loginReducer from "./login-slice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { optionsApi } from "./optionsApi";
import { searchApi } from "./searchApi";

export const store = configureStore({
  reducer: {
    accountCreator: accountReducer,
    accountLogin: loginReducer,
    [optionsApi.reducerPath]: optionsApi.reducer,
    [searchApi.reducerPath]: searchApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(optionsApi.middleware, searchApi.middleware),
});

setupListeners(store.dispatch);

import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./account-slice";
import loginReducer from "./login-slice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { optionsApi } from "./optionsApi";
import { searchApi } from "./searchApi";
import modalReducer from "./modal-slice";

export const store = configureStore({
  reducer: {
    accountCreator: accountReducer,
    accountLogin: loginReducer,
    [optionsApi.reducerPath]: optionsApi.reducer,
    [searchApi.reducerPath]: searchApi.reducer,
    modalCheck: modalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(optionsApi.middleware, searchApi.middleware),
});

setupListeners(store.dispatch);

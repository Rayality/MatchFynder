import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./account-slice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { optionsApi } from "./optionsApi";
import { searchApi } from "./searchApi";
import { loginApi } from "./loginAPI";
import modalReducer from "./modal-slice";
import autoLocationReducer from "./locationSlice"
import { wsApi } from "./webSocket-slice";

export const store = configureStore({
  reducer: {
    accountCreator: accountReducer,
    [optionsApi.reducerPath]: optionsApi.reducer,
    [searchApi.reducerPath]: searchApi.reducer,
    [loginApi.reducerPath]: loginApi.reducer,
    modalCheck: modalReducer,
    autoLocation: autoLocationReducer,
    [wsApi.reducerPath]: wsApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      optionsApi.middleware,
      searchApi.middleware,
      wsApi.middleware,
      loginApi.middleware
    ),
});

setupListeners(store.dispatch);

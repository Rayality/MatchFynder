import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { optionsApi } from "./optionsApi";

export const store = configureStore({
  reducer: {
    [optionsApi.reducerPath]: optionsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(optionsApi.middleware),
});

setupListeners(store.dispatch);

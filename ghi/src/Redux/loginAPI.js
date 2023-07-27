import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const loginApi = createApi({
  reducerPath: "login",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000",
  }),
  endpoints: (builder) => ({
    postLogin: builder.mutation({
      query: (formBody) => ({
        url: "/token",
        method: "POST",
        body: formBody,
        credentials: "include"
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/token",
        method: "DELETE",
        credentials: "include"
      })
    }),
    createAccount: builder.mutation({
      query: (formBody) => ({
        url: "accounts",
        method: "POST",
        body: formBody,
        credentials: "include",
      })
    })
  }),
});

export const { usePostLoginMutation, useLogoutMutation, useCreateAccountMutation } = loginApi;

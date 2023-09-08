import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const loginApi = createApi({
  reducerPath: "login",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_HOST,
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
        url: "api/accounts",
        method: "POST",
        body: formBody,
        credentials: "include",
      })
    })
  }),
});

export const { usePostLoginMutation, useLogoutMutation, useCreateAccountMutation } = loginApi;

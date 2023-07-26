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
      }),
    }),
  }),
});

export const { usePostLoginMutation } = loginApi;

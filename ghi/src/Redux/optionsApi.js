import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// create an API object called optionsApi which
// will contain (i) where in our store we'll
// save our data; (ii) what url to use (iii)
// all of the endpoints we can get
export const optionsApi = createApi({
  // save data within an options container in our store
  reducerPath: "options",
  baseQuery: fetchBaseQuery({

    baseUrl: process.env.REACT_APP_API_HOST,

  }),
  // setup tag for the option list
  tagTypes: ["OptionList"],
  // use the endpoints function, which takes a
  // builder object and creates each of our endpoints
  endpoints: (builder) => ({
    // return the methods that are available to
    // interact with the API
    getAllOptions: builder.query({
      // define a query function to return
      // the endpoints
      query: () => ({
        url: "/options",
        credentials: "include",
        providesTags: ["OptionList"]
      }),

    }),
    getSearchOptions: builder.query({
      query: ({ search_id }) => ({
        url: `/search/${search_id}/options`,
        credentials: "include",
      })
    })
  })
});

// export useGetOptionsQuery hook generated by the builder
export const { useGetAllOptionsQuery, useGetSearchOptionsQuery } = optionsApi;

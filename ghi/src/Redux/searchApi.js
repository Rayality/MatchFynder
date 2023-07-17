import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
//import Option, {optionId} from "../Components/views/OptionCard";
//<Option optionId={optionId} />

// create an API object called searchApi which
// will contain (i) where in our store we'll
// save our data; (ii) what url to use (iii)
// all of the endpoints we can get
export const searchApi = createApi({
  // save data within a search container in our store
  reducerPath: "",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000",
  }),
  // setup tag for searches
  tagTypes: ["Search"],
  // use the endpoints function, which takes a
  // builder object and creates each of our endpoints
  endpoints: (builder) => ({
    // return the methods that are available to
    // interact with the API
    createSearch: builder.mutation({
      query: (data) => ({
        url: "/search/create",
        body: {
          owner: 1,
        },
        method: "post",
      }),
    }),
    getSearch: builder.query({
      // define a query function to return
      // the endpoints
      query: (search_id) => `search/${search_id}/options`,
      providesTags: ["Search"],
    }),
    optionsApiZip: builder.query({
      query: (zipcode, search_id) => ({
        url: `/query/zipcode`,
        params: { zipcode, search_id },
      }),
    }),
    optionsApiCity: builder.query({
      query: (data) => ({
        url: "/query/city",
        body: data,
      }),
    }),

    getMatchMade: builder.query({
      query: (search_id) => ({ url: `search/${search_id}/match_made` }),
    }),
    addSearchOption: builder.mutation({
      query: ({ search_id, option_id }) => ({
        url: `/search/${search_id}/options`,
        body: {
          option_id: option_id,
          search_id: search_id,
        },
        method: "post",
      }),
    }),
  }),
});

// export hooks generated by the builder
export const {
  useGetSearchQuery,
  useCreateSearchMutation,
  useGetMatchMadeQuery,
  useAddSearchOptionMutation,
  useLazyOptionsApiZipQuery,
  useOptionsApiCityQuery,
} = searchApi;

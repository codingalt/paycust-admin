import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const storeDealsApi = createApi({
  reducerPath: "storeDealsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_URI,
    prepareHeaders: async (headers, query) => {
      const authToken = localStorage.getItem("flonestTokenAdmin");
      headers.set("authorization", `Bearer ${authToken}`);
      headers.set("x-app-type", "Web");
      headers.set("Accept", "application/json");
      return headers;
    },
  }),
  tagTypes: ["storeDealsApi"],
  endpoints: (builder) => ({
    getStoreDeals: builder.query({
      query: () => `customer/store/deals`,
      providesTags: ["storeDealsApi"],
    }),

    getStoreProducts: builder.query({
      query: () => `admin/store/deals/create`,
      providesTags: ["storeDealsApi"],
    }),

    addStoreDeals: builder.mutation({
      query: (data) => ({
        url: `admin/store/deals`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["storeDealsApi"],
    }),
  }),
});

export const { useGetStoreDealsQuery, useGetStoreProductsQuery, useAddStoreDealsMutation } =
  storeDealsApi;

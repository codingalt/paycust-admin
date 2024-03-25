import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const storeBrandsApi = createApi({
  reducerPath: "storeBrandsApi",
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
  tagTypes: ["storeBrandsApi"],
  endpoints: (builder) => ({
    getStoreBrands: builder.query({
      query: () => `admin/store/brands`,
      providesTags: ["storeBrandsApi"],
    }),

    addStoreBrand: builder.mutation({
      query: (data) => ({
        url: `admin/store/brands`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["storeBrandsApi"],
    }),

  }),
});

export const {
  useGetStoreBrandsQuery,
  useAddStoreBrandMutation
} = storeBrandsApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const storeSizesWeightsApi = createApi({
  reducerPath: "storeSizesWeightsApi",
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
  tagTypes: ["storeSizesWeightsApi"],
  endpoints: (builder) => ({
    getStoreSizes: builder.query({
      query: () => `admin/store/sizes`,
      providesTags: ["storeSizesWeightsApi"],
    }),

    addStoreSize: builder.mutation({
      query: (data) => ({
        url: `admin/store/sizes`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["storeSizesWeightsApi"],
    }),

    getStoreWeights: builder.query({
      query: () => `admin/store/weights`,
      providesTags: ["storeSizesWeightsApi"],
    }),

    addStoreWeight: builder.mutation({
      query: (data) => ({
        url: `admin/store/weights`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["storeSizesWeightsApi"],
    }),
  }),
});

export const {
  useGetStoreSizesQuery,
  useAddStoreSizeMutation,
  useAddStoreWeightMutation,
  useGetStoreWeightsQuery
} = storeSizesWeightsApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_URI,
    prepareHeaders: async (headers, query) => {
      const authToken = localStorage.getItem("paycustTokenAdmin");
      headers.set("authorization", `Bearer ${authToken}`);
      headers.set("x-app-type", "Web");
      headers.set("Accept", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => `categories`,
      providesTags: ["Category"],
    }),

    addCategory: builder.mutation({
      query: (data) => ({
        url: "addCategory",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),

    addSubCategory: builder.mutation({
      query: (data) => ({
        url: "addSubCategory",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useAddCategoryMutation,
  useAddSubCategoryMutation,
  useGetCategoriesQuery
} = categoryApi;

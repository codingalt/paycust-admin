import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const businessesApi = createApi({
  reducerPath: "businessesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_URI,
    prepareHeaders: async (headers, query) => {
      const authToken = localStorage.getItem("paycustTokenAdmin");
      headers.set("authorization", `Bearer ${authToken}`);
      headers.set("x-app-type", "Web");
      return headers;
    },
  }),
  tagTypes: ["Businesses"],
  endpoints: (builder) => ({
    getBusinesses: builder.query({
      query: () => `admin/businesses`,
      providesTags: ["Businesses"],
    }),
  }),
});

export const {
  useGetBusinessesQuery
} = businessesApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const kycApi = createApi({
  reducerPath: "kycApi",
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
  tagTypes: ["kycApi"],
  endpoints: (builder) => ({
    getKyc: builder.query({
      query: () => `admin/users/kyc`,
      providesTags: ["kycApi"],
    }),

    approveKyc: builder.mutation({
      query: (userId) => ({
        url: `admin/users/approveKyc/${userId}`,
        method: "POST",
        body: userId,
      }),
      invalidatesTags: ["kycApi"],
    }),
  }),
});

export const {
  useGetKycQuery,
  useApproveKycMutation
} = kycApi;

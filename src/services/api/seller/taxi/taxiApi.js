import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const taxiApi = createApi({
  reducerPath: "taxiApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_URI,
    prepareHeaders: async (headers, query) => {
      const authToken = localStorage.getItem("flonestTokenAdmin");
      headers.set("authorization", `Bearer ${authToken}`);
      headers.set("x-app-type", "Web");
      headers.set("Content-Type", "application/json");
      headers.set("Accept", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Taxi"],
  endpoints: (builder) => ({
    getVerifiedDrivers: builder.query({
      query: () => `admin/taxi/verifiedDrivers`,
      providesTags: ["Taxi"],
    }),

    getPendingDrivers: builder.query({
      query: () => `admin/taxi/pendingDrivers`,
      providesTags: ["Taxi"],
    }),

    approveDriver: builder.mutation({
      query: (driver_id) => ({
        url: `admin/taxi/approveDriver/${driver_id}`,
        method: "POST",
        body: driver_id,
      }),
      invalidatesTags: ["Taxi"],
    }),

    rejectDriver: builder.mutation({
      query: (driver_id) => ({
        url: `admin/taxi/rejectDriver/${driver_id}`,
        method: "POST",
        body: driver_id,
      }),
      invalidatesTags: ["Taxi"],
    }),

    getPendingVehicles: builder.query({
      query: () => `admin/taxi/pendingVehicles`,
      providesTags: ["Taxi"],
    }),

    getVerifiedVehicles: builder.query({
      query: () => `admin/taxi/verifiedVehicles`,
      providesTags: ["Taxi"],
    }),

    approveVehicle: builder.mutation({
      query: (vehicle_id) => ({
        url: `admin/taxi/approveVehicle/${vehicle_id}`,
        method: "POST",
        body: vehicle_id,
      }),
      invalidatesTags: ["Taxi"],
    }),

    rejectVehicle: builder.mutation({
      query: (vehicle_id) => ({
        url: `admin/taxi/rejectVehicle/${vehicle_id}`,
        method: "POST",
        body: vehicle_id,
      }),
      invalidatesTags: ["Taxi"],
    }),
  }),
});

export const {
  useGetPendingDriversQuery,
  useGetVerifiedDriversQuery,
  useApproveDriverMutation,
  useRejectDriverMutation,
  useGetPendingVehiclesQuery,
  useGetVerifiedVehiclesQuery,
  useApproveVehicleMutation,
  useRejectVehicleMutation
} = taxiApi;

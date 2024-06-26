import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const tagsApi = createApi({
  reducerPath: "tagsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_URI,
    prepareHeaders: async (headers, query) => {
      const authToken = localStorage.getItem("paycustTokenAdmin");
      headers.set("authorization", `Bearer ${authToken}`);
      headers.set("x-app-type", "Web");
      return headers;
    },
  }),
  tagTypes: ["Tags"],
  endpoints: (builder) => ({
    getTags: builder.query({
      query: () => `admin/tags`,
      providesTags: ["Tags"],
    }),

    addTag: builder.mutation({
      query: (data) => ({
        url: "admin/tags",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Tags"],
    }),

    getTagEdit: builder.query({
      query: (id) => `admin/tags/${id}/edit`,
      providesTags: ["Tags"],
    }),

    deleteTag: builder.mutation({
      query: ({ id }) => ({
        url: `admin/tags/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tags"],
    }),

    updateTag: builder.mutation({
      query: ({ id, data }) => ({
        url: `admin/tags/${id}?_method=PUT`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Tags"],
    }),
  }),
});

export const {
  useGetTagsQuery,
  useAddTagMutation,
  useGetTagEditQuery,
  useUpdateTagMutation,
  useDeleteTagMutation
} = tagsApi;

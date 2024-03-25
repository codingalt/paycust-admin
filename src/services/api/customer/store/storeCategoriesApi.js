import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const storeCategoriesApi = createApi({
  reducerPath: "storeCategoriesApi",
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
  tagTypes: ["storeCategoriesApi", "subCategory", "features"],
  endpoints: (builder) => ({
    getGlobalCategories: builder.query({
      query: () => `admin/store/globalCategories`,
      providesTags: ["storeCategoriesApi"],
    }),

    addGlobalCategory: builder.mutation({
      query: (formData) => ({
        url: `admin/store/globalCategories`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["storeCategoriesApi"],
    }),

    addSubGlobalCategory: builder.mutation({
      query: (formData) => ({
        url: `admin/store/subGlobalCategories`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["subCategory"],
    }),

    getSubGlobalCategories: builder.query({
      query: () => `admin/store/subGlobalCategories`,
      providesTags: ["subCategory"],
    }),

    getSubGlobalCategoryById: builder.query({
      query: (id) => `admin/store/subGlobalCategories/${id}/edit`,
      providesTags: ["subCategory"],
    }),

    updateSubGlobalCategory: builder.mutation({
      query: ({ id, formData }) => ({
        url: `admin/store/updateCategory/${id}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["subCategory"],
    }),

    addFeatures: builder.mutation({
      query: (data) => ({
        url: `admin/store/features`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["features"],
    }),

    getFeatures: builder.query({
      query: () => `admin/store/features`,
      providesTags: ["features"],
    }),

    getFeatureById: builder.query({
      query: (id) => `admin/store/features/${id}/edit`,
      providesTags: ["features"],
    }),

    updateFeatures: builder.mutation({
      query: ({id,data}) => ({
        url: `admin/store/updateFeature/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["features"],
    }),
  }),
});

export const {
  useGetGlobalCategoriesQuery,
  useAddGlobalCategoryMutation,
  useGetSubGlobalCategoriesQuery,
  useAddSubGlobalCategoryMutation,
  useAddFeaturesMutation,
  useGetFeaturesQuery,
  useGetSubGlobalCategoryByIdQuery,
  useUpdateSubGlobalCategoryMutation,
  useGetFeatureByIdQuery,
  useUpdateFeaturesMutation
} = storeCategoriesApi;

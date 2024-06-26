import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_URI,
    prepareHeaders: async (headers, query) => {
      const authToken = localStorage.getItem("paycustTokenAdmin");
      headers.set("authorization", `Bearer ${authToken}`);
      headers.set("x-app-type", "Web");
      return headers;
    },
  }),
  tagTypes: ["Category", "SubCategory"],
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => `admin/categories`,
      providesTags: ["Category"],
    }),

    getCategoryEdit: builder.query({
      query: (categoryId) => `admin/categories/${categoryId}/edit`,
      providesTags: ["Category"],
    }),

    addCategory: builder.mutation({
      query: (data) => ({
        url: "admin/categories",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),

    updateCategory: builder.mutation({
      query: ({ categoryId, formData }) => ({
        url: `admin/categories/${categoryId}?_method=PUT`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Category"],
    }),

    deleteCategory: builder.mutation({
      query: ({ id }) => ({
        url: `admin/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),

    getSubCategories: builder.query({
      query: () => `admin/subCategories`,
      providesTags: ["SubCategory"],
    }),

    getSubCategoryEdit: builder.query({
      query: (subCategoryId) => `admin/subCategories/${subCategoryId}/edit`,
      providesTags: ["SubCategory"],
    }),

    addSubCategory: builder.mutation({
      query: (data) => ({
        url: "admin/subCategories",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["SubCategory"],
    }),

    updateSubCategory: builder.mutation({
      query: ({ subCategoryId, formData }) => ({
        url: `admin/subCategories/${subCategoryId}?_method=PUT`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["SubCategory"],
    }),

    deleteSubCategory: builder.mutation({
      query: ({ id }) => ({
        url: `admin/subCategories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SubCategory"],
    }),
  }),
});

export const {
  useAddCategoryMutation,
  useAddSubCategoryMutation,
  useGetCategoriesQuery,
  useGetSubCategoriesQuery,
  useGetSubCategoryEditQuery,
  useUpdateSubCategoryMutation,
  useGetCategoryEditQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useDeleteSubCategoryMutation
} = categoryApi;

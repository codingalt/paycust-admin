import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import authSlice from "../services/slices/auth/authSlice";
import { authApi } from "@/services/api/authApi";
import { categoryApi } from "@/services/api/categoryApi";
import { businessesApi } from "@/services/api/businessesApi";
import { tagsApi } from "@/services/api/tagsApi";

export const store = configureStore({
  reducer: {
    // Auth Api
    [authApi.reducerPath]: authApi.reducer,

    // Category Api
    [categoryApi.reducerPath]: categoryApi.reducer,

    // Businesses Api
    [businessesApi.reducerPath]: businessesApi.reducer,

    // Tags Api
    [tagsApi.reducerPath]: tagsApi.reducer,

    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat([
      authApi.middleware,
      categoryApi.middleware,
      businessesApi.middleware,
      tagsApi.middleware,
    ]),
});

setupListeners(store.dispatch);

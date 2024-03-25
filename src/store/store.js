import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import authSlice from "../services/slices/auth/authSlice";
import { authApi } from "../services/api/authApi/authApi";
import { taxiApi } from "@/services/api/seller/taxi/taxiApi";
import { storeCategoriesApi } from "@/services/api/customer/store/storeCategoriesApi";
import { storeSizesWeightsApi } from "@/services/api/customer/store/storeSizesWeightsApi";
import { storeBrandsApi } from "@/services/api/customer/store/storeBrandsApi";

export const store = configureStore({
  reducer: {
    // Auth Api
    [authApi.reducerPath]: authApi.reducer,

    // Taxi Api
    [taxiApi.reducerPath]: taxiApi.reducer,

    // Store Api
    [storeCategoriesApi.reducerPath]: storeCategoriesApi.reducer,
    [storeSizesWeightsApi.reducerPath]: storeSizesWeightsApi.reducer,
    [storeBrandsApi.reducerPath]: storeBrandsApi.reducer,

    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat([
      authApi.middleware,
      taxiApi.middleware,
      storeCategoriesApi.middleware,
      storeSizesWeightsApi.middleware,
      storeBrandsApi.middleware,
    ]),
});

setupListeners(store.dispatch);

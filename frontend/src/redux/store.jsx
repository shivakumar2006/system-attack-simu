import { configureStore } from "@reduxjs/toolkit";
import { AuthApi } from "./api/AuthApi";
import authReducer from "./api/AuthSlice";

export const store = configureStore({
    reducer: {
        [AuthApi.reducerPath]: AuthApi.reducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(AuthApi.middleware)
})
import { configureStore } from "@reduxjs/toolkit";
import { AuthApi } from "./api/AuthApi";
import authReducer from "./api/AuthSlice";
import { hitApi } from "./api/HitApi";
import { AttackApi } from "./api/AttackApi";

export const store = configureStore({
    reducer: {
        [AuthApi.reducerPath]: AuthApi.reducer,
        [hitApi.reducerPath]: hitApi.reducer,
        [AttackApi.reducerPath]: AttackApi.reducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(AuthApi.middleware, hitApi.middleware, AttackApi.middleware)
})
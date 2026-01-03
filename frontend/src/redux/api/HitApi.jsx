import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const hitApi = createApi({
    reducerPath: "hitApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8081"
    }),
    endpoints: (builder) => ({
        hit: builder.mutation({
            query: () => ({
                url: "/hit",
                method: "POST",
            })
        })
    })
})

export const { useHitMutation } = hitApi;
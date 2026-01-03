import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const AttackApi = createApi({
    reducerPath: "attackApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8082"
    }),
    endpoints: (builder) => ({
        attack: builder.mutation({
            query: (payload) => ({
                url: "/attack",
                method: "POST",
                body: payload,
            })
        })
    })
})

export const { useAttackMutation } = AttackApi;
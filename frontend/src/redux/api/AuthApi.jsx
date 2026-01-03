import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const AuthApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseurl: "http://localhost:8080",
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token;
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: "/login",
                method: "POST",
                body: credentials,
            })
        }),

        signup: builder.mutation({
            query: (userData) => ({
                url: "/signup",
                method: "POST",
                body: userData,
            })
        }),

        forgotPassword: builder.mutation({
            query: (email) => ({
                url: "/forgot-password",
                method: "POST",
                body: email,
            })
        }),

        resetPassword: builder.mutation({
            query: (token, new_password) => ({
                url: "/reset-password",
                method: "POST",
                body: { token, new_password }
            })
        }),

        getUser: builder.query({
            query: () => "/me"
        }),

        verifyUser: builder.query({
            query: () => "/verify"
        })
    })
});

export const { useLoginMutation, useSignupMutation, useForgotPasswordMutation, useResetPasswordMutation, useGetUserQuery, useVerifyUserQuery } = AuthApi;
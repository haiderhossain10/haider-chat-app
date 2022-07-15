import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API }),
    endpoints: (builder) => ({
        postRegApi: builder.mutation({
            query: (data) => {
                return {
                    url: "/registration",
                    method: "POST",
                    body: {
                        firstName: data.firstName,
                        lastName: data.lastName,
                        email: data.email,
                        password: data.password,
                    },
                };
            },
        }),
        postLoginApi: builder.mutation({
            query: (data) => {
                return {
                    url: "/login",
                    method: "POST",
                    body: {
                        email: data.email,
                        password: data.password,
                    },
                };
            },
        }),
    }),
});

export const { usePostRegApiMutation, usePostLoginApiMutation } = authApi;

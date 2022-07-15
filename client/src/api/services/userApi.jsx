import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API }),
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => {
                return {
                    url: "/user/fetch-users",
                    method: "GET",
                };
            },
        }),
        getConversation: builder.query({
            query: () => {
                return {
                    url: "/user/conversation/fetch",
                    method: "GET",
                };
            },
        }),
        getPostChat: builder.mutation({
            query: (data) => {
                return {
                    url: "/user/chat/fetch",
                    method: "POST",
                    body: data,
                };
            },
        }),
    }),
});

export const {
    useGetUsersQuery,
    useGetConversationQuery,
    useGetPostChatMutation,
} = userApi;

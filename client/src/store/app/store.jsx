import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { authApi } from "../../api/services/authApi";
import { userApi } from "../../api/services/userApi";
import userSlice from "../features/userSlice";

export const store = configureStore({
    reducer: {
        user: userSlice,
        // api
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([authApi.middleware, userApi.middleware]),
});

setupListeners(store.dispatch);

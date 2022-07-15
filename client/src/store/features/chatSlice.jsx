import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
    name: "users",
    initialState: {
        msg: [
            {
                id: 1,
                body: "Hello",
            },
        ],
    },
    reducers: {},
});

export const { searchUser } = chatSlice.actions;
export default chatSlice.reducer;

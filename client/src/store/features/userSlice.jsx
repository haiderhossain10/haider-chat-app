import { createSlice } from "@reduxjs/toolkit";

export const useSlice = createSlice({
    name: "users",
    initialState: {
        searchedUser: [],
        conversation: [],
        chat: [],
    },
    reducers: {
        searchUser: (state, action) => {
            state.searchedUser = action.payload;
        },
        initConversationUser: (state, action) => {
            state.conversation = action.payload;
        },
        initChat: (state, action) => {
            state.chat = action.payload;
        },
    },
});

export const { searchUser, initConversationUser, initChat } = useSlice.actions;
export default useSlice.reducer;

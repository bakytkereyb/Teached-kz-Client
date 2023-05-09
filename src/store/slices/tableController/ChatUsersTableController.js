import {createSlice} from "@reduxjs/toolkit";

export const initialState = {
    currentPage: 1,
    pageSize: 5,
};

export const chatUsersTableControllerSlice = createSlice({
    name: 'chatUsersTableControllerSlice',
    initialState,
    reducers: {
        changeCurrentPage(state, action) {
            state.currentPage = action.payload.page;
            state.pageSize = action.payload.pageSize;
        },
    },
});

export const { changeCurrentPage } = chatUsersTableControllerSlice.actions;

export default chatUsersTableControllerSlice.reducer;
import {createSlice} from "@reduxjs/toolkit";

export const initialState = {
    currentPage: 1,
    pageSize: 5,
};

export const adminUsersTableControllerSlice = createSlice({
    name: 'adminUsersTableControllerSlice',
    initialState,
    reducers: {
        changeCurrentPage(state, action) {
            state.currentPage = action.payload.page;
            state.pageSize = action.payload.pageSize;
        },
    },
});

export const { changeCurrentPage } = adminUsersTableControllerSlice.actions;

export default adminUsersTableControllerSlice.reducer;
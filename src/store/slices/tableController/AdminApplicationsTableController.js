import {createSlice} from "@reduxjs/toolkit";

export const initialState = {
    currentPage: 1,
    pageSize: 5,
};

export const adminApplicationsTableControllerSlice = createSlice({
    name: 'adminApplicationsTableControllerSlice',
    initialState,
    reducers: {
        changeCurrentPage(state, action) {
            state.currentPage = action.payload.page;
            state.pageSize = action.payload.pageSize;
        },
    },
});

export const { changeCurrentPage } = adminApplicationsTableControllerSlice.actions;

export default adminApplicationsTableControllerSlice.reducer;
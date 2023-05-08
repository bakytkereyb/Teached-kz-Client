import {createSlice} from "@reduxjs/toolkit";

export const initialState = {
    currentPage: 1,
    pageSize: 5,
};

export const adminCoursersTableControllerSlice = createSlice({
    name: 'adminCoursersTableControllerSlice',
    initialState,
    reducers: {
        changeCurrentPage(state, action) {
            state.currentPage = action.payload.page;
            state.pageSize = action.payload.pageSize;
        },
    },
});

export const { changeCurrentPage } = adminCoursersTableControllerSlice.actions;

export default adminCoursersTableControllerSlice.reducer;
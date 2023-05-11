import {createSlice} from "@reduxjs/toolkit";

export const initialState = {
    currentPage: 1,
    pageSize: 5,
};

export const courseStudentsViewController = createSlice({
    name: 'courseStudentsViewController',
    initialState,
    reducers: {
        changeCurrentPage(state, action) {
            state.currentPage = action.payload.page;
            state.pageSize = action.payload.pageSize;
        },
    },
});

export const { changeCurrentPage } = courseStudentsViewController.actions;

export default courseStudentsViewController.reducer;
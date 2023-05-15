import {createSlice} from "@reduxjs/toolkit";

export const initialState = {
    currentPage: 1,
    pageSize: 5,
};

export const applicationsTableControllerSlice = createSlice({
    name: 'applicationsTableControllerSlice',
    initialState,
    reducers: {
        changeCurrentPage(state, action) {
            state.currentPage = action.payload.page;
            state.pageSize = action.payload.pageSize;
        },
    },
});

export const { changeCurrentPage } = applicationsTableControllerSlice.actions;

export default applicationsTableControllerSlice.reducer;
import {createSlice} from '@reduxjs/toolkit';

export const initialState = {
    currentPage: 1,
    pageSize: 5,
};

export const myCoursersTableControllerSlice = createSlice({
    name: 'myCoursersTableControllerSlice',
    initialState,
    reducers: {
        changeCurrentPage(state, action) {
            state.currentPage = action.payload.page;
            state.pageSize = action.payload.pageSize;
        },
    },
});

export const { changeCurrentPage } = myCoursersTableControllerSlice.actions;

export default myCoursersTableControllerSlice.reducer;
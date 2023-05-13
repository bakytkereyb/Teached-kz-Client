import {createSlice} from '@reduxjs/toolkit';

export const initialState = {
    currentPage: 1,
    pageSize: 5,
};

export const TrainingCoursesTableControllerSlice = createSlice({
    name: 'TrainingCoursesTableControllerSlice',
    initialState,
    reducers: {
        changeCurrentPage(state, action) {
            state.currentPage = action.payload.page;
            state.pageSize = action.payload.pageSize;
        },
    },
});

export const { changeCurrentPage } = TrainingCoursesTableControllerSlice.actions;

export default TrainingCoursesTableControllerSlice.reducer;
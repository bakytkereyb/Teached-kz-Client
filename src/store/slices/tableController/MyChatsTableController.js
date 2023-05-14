import {createSlice} from '@reduxjs/toolkit';

export const initialState = {
    currentPage: 1,
    pageSize: 5,
};

export const myChatsController = createSlice({
    name: 'myChatsController',
    initialState,
    reducers: {
        changeCurrentPage(state, action) {
            state.currentPage = action.payload.page;
            state.pageSize = action.payload.pageSize;
        },
    },
});

export const { changeCurrentPage } = myChatsController.actions;

export default myChatsController.reducer;
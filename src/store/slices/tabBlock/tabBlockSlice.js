import {createSlice} from "@reduxjs/toolkit";

let initialState = {
    tabNum: 0,
}

const tabBlockSlice = createSlice({
    name: 'tabBlock',
    initialState,
    reducers: {
        resetTab(state) {
            state.tabNum = 0;
        },
        setTab(state, action) {
            state.tabNum = action.payload;
        }
    },
});

export const {setTab, resetTab} = tabBlockSlice.actions;

export default tabBlockSlice.reducer;
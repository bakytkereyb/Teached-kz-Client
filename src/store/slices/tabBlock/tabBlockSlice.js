import {createSlice} from "@reduxjs/toolkit";

let initialState = {
    tabNum: 0,
}

const tabBlockSlice = createSlice({
    name: 'tabBlock',
    initialState,
    reducers: {
        setTab(state, action) {
            state.tabNum = action.payload;
        }
    },
});

export const {setTab} = tabBlockSlice.actions;

export default tabBlockSlice.reducer;
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import UserService from "../../services/UserService";

let initialState = {
    user: null,
    isLoading: true,
    error: null,
}
export const getUserByUsername = createAsyncThunk(
    'getUserByUsername',
    async (username, { getState, rejectWithValue, dispatch }) => {
        try {
            const response = await UserService.getUserByUsername(username);
            return response?.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    },
);

export const getUsers = createAsyncThunk(
    'getUsers',
    async ({skip,limit}, { getState, rejectWithValue, dispatch }) => {
        try {
            const response = await UserService.getUserByUsername(skip, limit);
            return response?.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    },
);


const publicUserSlice = createSlice({
    name: 'publicUser',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUserByUsername.pending, (state) => {
                state.isLoading = true;
                state.user = null;
            })
            .addCase(getUserByUsername.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(getUserByUsername.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.error = action.payload;
            })
    }
});

export const {} = publicUserSlice.actions;

export default publicUserSlice.reducer;
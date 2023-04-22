import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import UserService from "../../services/UserService";

let initialState = {
    user: null,
    isLoading: false,
    error: null,
}

export const getUserByToken = createAsyncThunk(
    'getUserByToken',
    async (_, { getState, thunkAPI, dispatch }) => {
        try {
            const response = await UserService.getUserByToken();
            return response?.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
    },
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserByToken.pending, (state) => {
                state.isLoading = true;
                state.user = null;
            })
            .addCase(getUserByToken.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(getUserByToken.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.error = action.payload;
            })
    }
});

export const {setUser} = userSlice.actions;

export default userSlice.reducer;
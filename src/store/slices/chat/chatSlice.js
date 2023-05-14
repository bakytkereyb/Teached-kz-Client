import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import ChatService from '../../../services/ChatService';

let initialState = {
    chat: null,
    isLoading: true,
    error: null,
}

export const getChatById = createAsyncThunk(
    'getChatById',
    async ({ id }, { getState, rejectWithValue, dispatch }) => {
        try {
            const response = await ChatService.getChatById(id);
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    },
);

const chatSlice = createSlice({
    name: 'chatSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getChatById.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.chat = null;
            })
            .addCase(getChatById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.chat = action.payload;
            })
            .addCase(getChatById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    }
});

export const {} = chatSlice.actions;

export default chatSlice.reducer;
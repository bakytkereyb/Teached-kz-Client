import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import ChatService from '../../../services/ChatService';

let initialState = {
    chats: [],
    isLoading: true,
    error: null,
    hasMore: false,
}

export const getAllMyChats = createAsyncThunk(
    'getAllMyChats',
    async ({ page, limit }, { getState, rejectWithValue, dispatch }) => {
        try {
            const response = await ChatService.getAllMyChats(page, limit);
            return response;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    },
);

const chatsSlice = createSlice({
    name: 'chatsSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllMyChats.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.chats = [];
                state.hasMore = false;
            })
            .addCase(getAllMyChats.fulfilled, (state, action) => {
                state.isLoading = false;
                state.chats = action.payload.data;
                state.hasMore = action.payload.hasMore;
            })
            .addCase(getAllMyChats.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    }
});

export const {} = chatsSlice.actions;

export default chatsSlice.reducer;
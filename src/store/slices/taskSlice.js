import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import TaskService from '../../services/TaskService';

let initialState = {
    task: null,
    isLoading: true,
    error: null,
}

export const getTask = createAsyncThunk(
    'getTask',
    async ({ courseId, sectionId, taskId }, { getState, rejectWithValue, dispatch }) => {
        try {
            const response = await TaskService.getTask(courseId, sectionId, taskId);
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    },
);

const taskSlice = createSlice({
    name: 'taskSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTask.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.task = null;
            })
            .addCase(getTask.fulfilled, (state, action) => {
                state.isLoading = false;
                state.task = action.payload;
            })
            .addCase(getTask.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    }
});

export const {} = taskSlice.actions;

export default taskSlice.reducer;

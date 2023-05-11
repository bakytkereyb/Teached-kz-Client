import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import TaskFilesService from "../../services/TaskFilesService";

let initialState = {
    taskFile: null,
    isLoading: true,
    error: null,
}

export const getTaskFiles = createAsyncThunk(
    'getTaskFiles',
    async ({studentId, taskId}, {getState, rejectWithValue, dispatch}) => {
        try {
            const response = await TaskFilesService.getTask(studentId, taskId);
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    },
);

const taskFilesSlice = createSlice({
    name: 'taskFilesSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTaskFiles.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.taskFile = null;
            })
            .addCase(getTaskFiles.fulfilled, (state, action) => {
                state.isLoading = false;
                state.taskFile = action.payload;
            })
            .addCase(getTaskFiles.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    }
});

export const {} = taskFilesSlice.actions;

export default taskFilesSlice.reducer;

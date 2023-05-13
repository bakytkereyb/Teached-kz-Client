import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import TaskService from "../../services/TaskService";

let initialState = {
    tasks: [],
    isLoading: true,
    error: null,
}

export const getAllTasks = createAsyncThunk(
    'getAllTasks',
    async (_, {getState, rejectWithValue, dispatch}) => {
        try {
            const response = await TaskService.getAllTasks();
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    },
);

const tasksSlice = createSlice({
    name: 'tasksSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllTasks.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.tasks = [];
            })
            .addCase(getAllTasks.fulfilled, (state, action) => {
                state.isLoading = false;
                state.tasks = action.payload;
            })
            .addCase(getAllTasks.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    }
});

export const {} = tasksSlice.actions;

export default tasksSlice.reducer;
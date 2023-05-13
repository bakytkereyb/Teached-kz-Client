import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import TrainingCoursesService from "../../services/TrainingCoursesService";

let initialState = {
    trainingCourses: [],
    isLoading: true,
    error: null,
    hasMore: false,
}

export const getAllTrainingCourses = createAsyncThunk(
    'getAllTrainingCourses',
    async ({page, limit}, {getState, rejectWithValue, dispatch}) => {
        try {
            const response = await TrainingCoursesService.getAllTrainingCourses(page, limit);
            return response;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    },
);

const trainingCoursesSlice = createSlice({
    name: 'trainingCoursesSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllTrainingCourses.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.trainingCourses = [];
                state.hasMore = false;
            })
            .addCase(getAllTrainingCourses.fulfilled, (state, action) => {
                state.isLoading = false;
                state.trainingCourses = action.payload.data;
                state.hasMore = action.payload.hasMore;
            })
            .addCase(getAllTrainingCourses.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    }
});

export const {} = trainingCoursesSlice.actions;

export default trainingCoursesSlice.reducer;
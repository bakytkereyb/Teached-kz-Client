import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import CourseService from "../../services/CourseService";

let initialState = {
    courses: [],
    isLoading: true,
    error: null,
    hasMore: false,
}

export const getAllPublicCourses = createAsyncThunk(
    'getAllPublicCourses',
    async ({ page, limit }, { getState, rejectWithValue, dispatch }) => {
        try {
            const response = await CourseService.getAllPublicCourses(page, limit);
            return response;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    },
);

export const getAllMyCourses = createAsyncThunk(
    'getAllMyCourses',
    async ({ page, limit }, { getState, rejectWithValue, dispatch }) => {
        try {
            const response = await CourseService.getAllMyCourses(page, limit);
            return response;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    },
);

const coursesSlice = createSlice({
    name: 'coursesSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllPublicCourses.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.courses = [];
                state.hasMore = false;
            })
            .addCase(getAllPublicCourses.fulfilled, (state, action) => {
                state.isLoading = false;
                state.courses = action.payload.data;
                state.hasMore = action.payload.hasMore;
            })
            .addCase(getAllPublicCourses.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(getAllMyCourses.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.courses = [];
                state.hasMore = false;
            })
            .addCase(getAllMyCourses.fulfilled, (state, action) => {
                state.isLoading = false;
                state.courses = action.payload.data;
                state.hasMore = action.payload.hasMore;
            })
            .addCase(getAllMyCourses.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    }
});

export const {} = coursesSlice.actions;

export default coursesSlice.reducer;

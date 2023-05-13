import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import PostCourseService from '../../services/PostCoursesService';

let initialState = {
    courses: [],
    isLoading: true,
    error: null,
    hasMore: false,
}

export const getAllPublicPostCourses = createAsyncThunk(
    'getAllPublicPostCourses',
    async ({ page, limit }, { getState, rejectWithValue, dispatch }) => {
        try {
            const response = await PostCourseService.getAllPublicPostCourses(page, limit);
            return response;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    },
);

export const getAllMyPostCourses = createAsyncThunk(
    'getAllMyPostCourses',
    async ({ page, limit }, { getState, rejectWithValue, dispatch }) => {
        try {
            const response = await PostCourseService.getAllMyPostCourses(page, limit);
            return response;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    },
);

const postCoursesSlice = createSlice({
    name: 'postCoursesSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllPublicPostCourses.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.courses = [];
                state.hasMore = false;
            })
            .addCase(getAllPublicPostCourses.fulfilled, (state, action) => {
                state.isLoading = false;
                state.courses = action.payload.data;
                state.hasMore = action.payload.hasMore;
            })
            .addCase(getAllPublicPostCourses.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(getAllMyPostCourses.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.courses = [];
                state.hasMore = false;
            })
            .addCase(getAllMyPostCourses.fulfilled, (state, action) => {
                state.isLoading = false;
                state.courses = action.payload.data;
                state.hasMore = action.payload.hasMore;
            })
            .addCase(getAllMyPostCourses.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    }
});

export const {} = postCoursesSlice.actions;

export default postCoursesSlice.reducer;
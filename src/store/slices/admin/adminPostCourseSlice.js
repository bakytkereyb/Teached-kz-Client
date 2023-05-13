import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import AdminPostCourseService from '../../../services/AdminPostCourseService';

let initialState = {
    courses: [],
    isLoading: true,
    error: null,
    hasMore: false,
    isLoadingCreateCourse: false,
    errorCreateCourse: null,
    isLoadingDeleteCourse: false,
    errorDeleteCourse: null,
}

export const getAllPostCourses = createAsyncThunk(
    'getAllPostCourses',
    async ({ page, limit }, { getState, rejectWithValue, dispatch }) => {
        try {
            const response = await AdminPostCourseService.getAllPostCourses(page, limit);
            return response;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    },
);

export const deletePostCourseById = createAsyncThunk(
    'deletePostCourseById',
    async ({ id }, { getState, rejectWithValue, dispatch }) => {
        try {
            const response = await AdminPostCourseService.deletePostCourseById(id);
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    },
);

export const createPostCourse = createAsyncThunk(
    'createPostCourse',
    async ({name, nameKz, nameRu, description, descriptionKz, descriptionRu}, {
        getState,
        rejectWithValue,
        dispatch
    }) => {
        try {
            const response = await AdminPostCourseService.createPostCourse(name, nameKz, nameRu, description, descriptionKz, descriptionRu);
            return response?.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    },
);

const adminPostCourseSlice = createSlice({
    name: 'adminPostCourseSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllPostCourses.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.courses = [];
                state.hasMore = false;
            })
            .addCase(getAllPostCourses.fulfilled, (state, action) => {
                state.isLoading = false;
                state.courses = action.payload.data;
                state.hasMore = action.payload.hasMore;
            })
            .addCase(getAllPostCourses.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(createPostCourse.pending, (state) => {
                state.isLoadingCreateComponent = true;
                state.errorCreatComponent = null;
            })
            .addCase(createPostCourse.fulfilled, (state, action) => {
                state.isLoadingCreateComponent = false;
            })
            .addCase(createPostCourse.rejected, (state, action) => {
                state.isLoadingCreateComponent = false;
                state.errorCreatComponent = action.payload;
            })
            .addCase(deletePostCourseById.pending, (state) => {
                state.isLoadingDeleteCourse = true;
                state.errorDeleteCourse = null;
            })
            .addCase(deletePostCourseById.fulfilled, (state, action) => {
                state.isLoadingDeleteCourse = false;
            })
            .addCase(deletePostCourseById.rejected, (state, action) => {
                state.isLoadingDeleteCourse = false;
                state.errorDeleteCourse = action.payload;
            })
    }
});

export const {} = adminPostCourseSlice.actions;

export default adminPostCourseSlice.reducer;
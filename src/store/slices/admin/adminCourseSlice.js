import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import AdminCourseService from "../../../services/AdminCourseService";

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

export const getAllCourses = createAsyncThunk(
    'getAllCourses',
    async ({ page, limit }, { getState, rejectWithValue, dispatch }) => {
        try {
            const response = await AdminCourseService.getAllCourses(page, limit);
            return response;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    },
);

export const deleteCourseById = createAsyncThunk(
    'deleteCourseById',
    async ({ id }, { getState, rejectWithValue, dispatch }) => {
        try {
            const response = await AdminCourseService.deleteCourseById(id);
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    },
);

export const createCourse = createAsyncThunk(
    'createCourse',
    async ({name, nameKz, nameRu, description, descriptionKz, descriptionRu, trainerUsername}, {
        getState,
        rejectWithValue,
        dispatch
    }) => {
        try {
            const response = await AdminCourseService.createCourse(name, nameKz, nameRu, description, descriptionKz, descriptionRu, trainerUsername);
            return response?.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    },
);

const adminCourseSlice = createSlice({
    name: 'adminCourseSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllCourses.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.courses = [];
                state.hasMore = false;
            })
            .addCase(getAllCourses.fulfilled, (state, action) => {
                state.isLoading = false;
                state.courses = action.payload.data;
                state.hasMore = action.payload.hasMore;
            })
            .addCase(getAllCourses.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(createCourse.pending, (state) => {
                state.isLoadingCreateComponent = true;
                state.errorCreatComponent = null;
            })
            .addCase(createCourse.fulfilled, (state, action) => {
                state.isLoadingCreateComponent = false;
            })
            .addCase(createCourse.rejected, (state, action) => {
                state.isLoadingCreateComponent = false;
                state.errorCreatComponent = action.payload;
            })
            .addCase(deleteCourseById.pending, (state) => {
                state.isLoadingDeleteCourse = true;
                state.errorDeleteCourse = null;
            })
            .addCase(deleteCourseById.fulfilled, (state, action) => {
                state.isLoadingDeleteCourse = false;
            })
            .addCase(deleteCourseById.rejected, (state, action) => {
                state.isLoadingDeleteCourse = false;
                state.errorDeleteCourse = action.payload;
            })
    }
});

export const {} = adminCourseSlice.actions;

export default adminCourseSlice.reducer;
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import AdminCourseService from "../../../services/AdminCourseService";

let initialState = {
    courses: [],
    isLoading: true,
    error: null,
    isLoadingCreateCourse: false,
    errorCreateCourse: null,
}

export const getAllCourses = createAsyncThunk(
    'getAllCourses',
    async (_, { getState, rejectWithValue, dispatch }) => {
        try {
            const response = await AdminCourseService.getAllCourses();
            return response?.data;
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
            })
            .addCase(getAllCourses.fulfilled, (state, action) => {
                state.isLoading = false;
                state.courses = action.payload
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
    }
});

export const {} = adminCourseSlice.actions;

export default adminCourseSlice.reducer;
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import AdminCourseService from '../../../services/AdminCourseService';

let initialState = {
    courses: [],
    isLoading: true,
    error: null,
}

export const getAllPublicCoursesWithoutPage = createAsyncThunk(
    'getAllPublicCoursesWithoutPage',
    async (_, { getState, rejectWithValue, dispatch }) => {
        try {
            const response = await AdminCourseService.getAllPublicCoursesWithoutPage();
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    },
);

const adminPublicCoursesSlice = createSlice({
    name: 'adminPublicCoursesSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllPublicCoursesWithoutPage.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.courses = [];
            })
            .addCase(getAllPublicCoursesWithoutPage.fulfilled, (state, action) => {
                state.isLoading = false;
                state.courses = action.payload;
            })
            .addCase(getAllPublicCoursesWithoutPage.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    }
});

export const {} = adminPublicCoursesSlice.actions;

export default adminPublicCoursesSlice.reducer;
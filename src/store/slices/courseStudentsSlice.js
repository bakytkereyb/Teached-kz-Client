import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import CourseStudentsService from "../../services/CourseStudentsService";

let initialState = {
    students: [],
    isLoading: true,
    error: null,
    hasMore: false,
}

export const getAllCourseStudents = createAsyncThunk(
    'getAllCourseStudents',
    async ({page, limit, id}, {getState, rejectWithValue, dispatch}) => {
        try {
            const response = await CourseStudentsService.getAllCourseStudents(page, limit, id);
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    },
);

const courseStudentsSlice = createSlice({
    name: 'courseStudentsSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllCourseStudents.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.students = [];
                state.hasMore = false;
            })
            .addCase(getAllCourseStudents.fulfilled, (state, action) => {
                state.isLoading = false;
                state.students = action.payload;
                state.hasMore = action.payload.hasMore;
            })
            .addCase(getAllCourseStudents.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    }
});

export const {} = courseStudentsSlice.actions;

export default courseStudentsSlice.reducer;

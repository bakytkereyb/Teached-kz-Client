import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import PostCourseService from '../../services/PostCoursesService';

let initialState = {
    students: [],
    isLoading: true,
    error: null,
    hasMore: false,
}

export const getAllPostCourseStudents = createAsyncThunk(
    'getAllPostCourseStudents',
    async ({page, limit, id}, {getState, rejectWithValue, dispatch}) => {
        try {
            const response = await PostCourseService.getAllPostCourseStudents(page, limit, id);
            return response;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    },
);

const postCourseStudentsSlice = createSlice({
    name: 'postCourseStudentsSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllPostCourseStudents.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.students = [];
                state.hasMore = false;
            })
            .addCase(getAllPostCourseStudents.fulfilled, (state, action) => {
                state.isLoading = false;
                state.students = action.payload.data;
                state.hasMore = action.payload.hasMore;
            })
            .addCase(getAllPostCourseStudents.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    }
});

export const {} = postCourseStudentsSlice.actions;

export default postCourseStudentsSlice.reducer;

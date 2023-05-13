import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import PostCourseService from '../../../services/PostCoursesService';

let initialState = {
    course: null,
    isLoading: true,
    error: null,
    addFileToSectionLoading: false,
    addFileToSectionError: null,
    removeFileToSectionLoading: false,
    removeFileToSectionError: null,
}

export const getPostCourseById = createAsyncThunk(
    'getPostCourseById',
    async ({id}, { getState, rejectWithValue, dispatch }) => {
        try {
            const response = await PostCourseService.getPostCourseById(id);
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    },
);

export const addSectionToPostCourseById = createAsyncThunk(
    'addSectionToPostCourseById',
    async ({id, sectionName}, { getState, rejectWithValue, dispatch }) => {
        try {
            const response = await PostCourseService.addSectionToPostCourseById(id, sectionName);
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    },
);

export const removeSectionByIdFromPostCourseById = createAsyncThunk(
    'removeSectionByIdFromPostCourseById',
    async ({id, sectionId}, { getState, rejectWithValue, dispatch }) => {
        try {
            const response = await PostCourseService.removeSectionByIdFromPostCourseById(id, sectionId);
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    },
);

export const addFileToSectionPostCourse = createAsyncThunk(
    'addFileToSectionPostCourse',
    async ({sectionId, label, fileName}, { getState, rejectWithValue, dispatch }) => {
        try {
            const response = await PostCourseService.addFileToSection(sectionId, label, fileName);
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    },
);

export const removeFileToSectionPostCourse = createAsyncThunk(
    'removeFileToSectionPostCourse',
    async ({sectionId, fileId}, { getState, rejectWithValue, dispatch }) => {
        try {
            const response = await PostCourseService.removeFileToSection(sectionId, fileId);
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    },
);


const postCourseSlice = createSlice({
    name: 'postCourseSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPostCourseById.pending, (state) => {
                state.isLoading = true;
                state.course = null;
                state.error = null;
            })
            .addCase(getPostCourseById.fulfilled, (state, action) => {
                state.course = action.payload;
                state.isLoading = false;
            })
            .addCase(getPostCourseById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(addSectionToPostCourseById.pending, (state) => {
                state.isLoading = true;
                state.course = null;
                state.error = null;
            })
            .addCase(addSectionToPostCourseById.fulfilled, (state, action) => {
                state.course = action.payload;
                state.isLoading = false;
            })
            .addCase(addSectionToPostCourseById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(removeSectionByIdFromPostCourseById.pending, (state) => {
                state.isLoading = true;
                state.course = null;
                state.error = null;
            })
            .addCase(removeSectionByIdFromPostCourseById.fulfilled, (state, action) => {
                state.course = action.payload;
                state.isLoading = false;
            })
            .addCase(removeSectionByIdFromPostCourseById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(addFileToSectionPostCourse.pending, (state) => {
                state.addFileToSectionLoading = true;
                state.addFileToSectionError = null;
            })
            .addCase(addFileToSectionPostCourse.fulfilled, (state, action) => {
                state.addFileToSectionLoading = false;
            })
            .addCase(addFileToSectionPostCourse.rejected, (state, action) => {
                state.addFileToSectionLoading = false;
                state.addFileToSectionError = action.payload;
            })
            .addCase(removeFileToSectionPostCourse.pending, (state) => {
                state.removeFileToSectionLoading = true;
                state.removeFileToSectionError = null;
            })
            .addCase(removeFileToSectionPostCourse.fulfilled, (state, action) => {
                state.removeFileToSectionLoading = false;
            })
            .addCase(removeFileToSectionPostCourse.rejected, (state, action) => {
                state.removeFileToSectionLoading = false;
                state.removeFileToSectionError = action.payload;
            })
    }
});

export const {} = postCourseSlice.actions;

export default postCourseSlice.reducer;
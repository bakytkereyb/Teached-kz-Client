import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import CourseService from "../../../services/CourseService";


let initialState = {
    course: null,
    isLoading: true,
    error: null,
    addFileToSectionLoading: false,
    addFileToSectionError: null,
    removeFileToSectionLoading: false,
    removeFileToSectionError: null,
}

export const getCourseById = createAsyncThunk(
    'getCourseById',
    async ({id}, { getState, rejectWithValue, dispatch }) => {
        try {
            const response = await CourseService.getCourseById(id);
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    },
);

export const addSectionToCourseById = createAsyncThunk(
    'addSectionToCourseById',
    async ({id, sectionName}, { getState, rejectWithValue, dispatch }) => {
        try {
            const response = await CourseService.addSectionToCourseById(id, sectionName);
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    },
);

export const removeSectionByIdFromCourseById = createAsyncThunk(
    'removeSectionByIdFromCourseById',
    async ({id, sectionId}, { getState, rejectWithValue, dispatch }) => {
        try {
            const response = await CourseService.removeSectionByIdFromCourseById(id, sectionId);
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    },
);

export const addFileToSection = createAsyncThunk(
    'addFileToSection',
    async ({sectionId, label, fileName}, { getState, rejectWithValue, dispatch }) => {
        try {
            const response = await CourseService.addFileToSection(sectionId, label, fileName);
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    },
);

export const removeFileToSection = createAsyncThunk(
    'removeFileToSection',
    async ({sectionId, fileId}, { getState, rejectWithValue, dispatch }) => {
        try {
            const response = await CourseService.removeFileToSection(sectionId, fileId);
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    },
);

const courseSlice = createSlice({
    name: 'courseSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCourseById.pending, (state) => {
                state.isLoading = true;
                state.course = null;
                state.error = null;
            })
            .addCase(getCourseById.fulfilled, (state, action) => {
                state.course = action.payload;
                state.isLoading = false;
            })
            .addCase(getCourseById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(addSectionToCourseById.pending, (state) => {
                state.isLoading = true;
                state.course = null;
                state.error = null;
            })
            .addCase(addSectionToCourseById.fulfilled, (state, action) => {
                state.course = action.payload;
                state.isLoading = false;
            })
            .addCase(addSectionToCourseById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(removeSectionByIdFromCourseById.pending, (state) => {
                state.isLoading = true;
                state.course = null;
                state.error = null;
            })
            .addCase(removeSectionByIdFromCourseById.fulfilled, (state, action) => {
                state.course = action.payload;
                state.isLoading = false;
            })
            .addCase(removeSectionByIdFromCourseById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(addFileToSection.pending, (state) => {
                state.addFileToSectionLoading = true;
                state.addFileToSectionError = null;
            })
            .addCase(addFileToSection.fulfilled, (state, action) => {
                state.addFileToSectionLoading = false;
            })
            .addCase(addFileToSection.rejected, (state, action) => {
                state.addFileToSectionLoading = false;
                state.addFileToSectionError = action.payload;
            })
            .addCase(removeFileToSection.pending, (state) => {
                state.removeFileToSectionLoading = true;
                state.removeFileToSectionError = null;
            })
            .addCase(removeFileToSection.fulfilled, (state, action) => {
                state.removeFileToSectionLoading = false;
            })
            .addCase(removeFileToSection.rejected, (state, action) => {
                state.removeFileToSectionLoading = false;
                state.removeFileToSectionError = action.payload;
            })
    }
});

export const {} = courseSlice.actions;

export default courseSlice.reducer;
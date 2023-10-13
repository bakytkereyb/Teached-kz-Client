import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import UserService from "../../services/UserService";
import UniversityService from "../../services/UniversityService";

let initialState = {
    universities: [],
    isLoading: true,
    error: null,
}

export const getAllUniversities = createAsyncThunk(
    'getAllUniversities',
    async (_, { getState, rejectWithValue, dispatch }) => {
        try {
            const response = await UniversityService.getAllUniversities();
            return response?.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    },
);
// export const getAllTrainersWithPagination = createAsyncThunk(
//     'getAllTrainersWithPagination',
//     async (_, { getState, rejectWithValue, dispatch }) => {
//         try {
//             const response = await AdminCourseService.getAllCourses();
//             return response?.data;
//         } catch (error) {
//             return rejectWithValue(error?.response?.data);
//         }
//     },
// );


const universityListSlice = createSlice({
    name: 'universityListSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllUniversities.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getAllUniversities.fulfilled, (state, action) => {
                state.isLoading = false;
                state.universities = action.payload;
            })
            .addCase(getAllUniversities.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.universities = [];
            })
    }
});

export const {} = universityListSlice.actions;

export default universityListSlice.reducer;
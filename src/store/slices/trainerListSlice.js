import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import UserService from "../../services/UserService";

let initialState = {
    trainers: [],
    isLoading: true,
    error: null,
}

export const getAllTrainers = createAsyncThunk(
    'getAllTrainers',
    async (_, { getState, rejectWithValue, dispatch }) => {
        try {
            const response = await UserService.getTrainers();
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


const trainerListSlice = createSlice({
    name: 'trainerListSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllTrainers.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getAllTrainers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.trainers = action.payload
            })
            .addCase(getAllTrainers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    }
});

export const {} = trainerListSlice.actions;

export default trainerListSlice.reducer;
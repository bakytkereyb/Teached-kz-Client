import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import AdminUserService from "../../../services/AdminUserService";

let initialState = {
    users: [],
    isLoading: true,
    error: null,
    isLoadingCreateAdmin: false,
    errorCreateAdmin: null,
    isLoadingCreateTrainer: false,
    errorCreateTrainer: null,
}

// export const getAllUsers = createAsyncThunk(
//     'getAllUsers',
//     async (_, { getState, rejectWithValue, dispatch }) => {
//         try {
//             const response = await AdminCourseService.getAllCourses();
//             return response?.data;
//         } catch (error) {
//             return rejectWithValue(error?.response?.data);
//         }
//     },
// );

export const createUserAdmin = createAsyncThunk(
    'createUserAdmin',
    async ({username, firstName, secondName, password, email}, {
        getState,
        rejectWithValue,
        dispatch
    }) => {
        try {
            const response = await AdminUserService.createAdmin(username, firstName, secondName, password, email);
            return response?.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    },
);


export const createUserTrainer = createAsyncThunk(
    'createUserTrainer',
    async ({username, firstName, secondName, password, email}, {
        getState,
        rejectWithValue,
        dispatch
    }) => {
        try {
            const response = await AdminUserService.createTrainer(username, firstName, secondName, password, email);
            return response?.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    },
);
const adminUserSlice = createSlice({
    name: 'adminUserSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createUserAdmin.pending, (state) => {
                state.isLoadingCreateAdmin = true;
                state.errorCreateAdmin = null;
            })
            .addCase(createUserAdmin.fulfilled, (state, action) => {
                state.isLoadingCreateAdmin = false;
            })
            .addCase(createUserAdmin.rejected, (state, action) => {
                state.isLoadingCreateAdmin = false;
                state.errorCreateAdmin = action.payload;
            })
            .addCase(createUserTrainer.pending, (state) => {
                state.isLoadingCreateTrainer = true;
                state.errorCreateTrainer = null;
            })
            .addCase(createUserTrainer.fulfilled, (state, action) => {
                state.isLoadingCreateTrainer = false;
            })
            .addCase(createUserTrainer.rejected, (state, action) => {
                state.isLoadingCreateTrainer = false;
                state.errorCreateTrainer = action.payload;
            })
    }
});

export const {} = adminUserSlice.actions;

export default adminUserSlice.reducer;
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import AdminUserService from "../../../services/AdminUserService";

let initialState = {
    users: [],
    isLoading: true,
    error: null,
    hasMore: false,
    isLoadingCreateAdmin: false,
    errorCreateAdmin: null,
    isLoadingCreateTrainer: false,
    errorCreateTrainer: null,
}

export const getAllUsers = createAsyncThunk(
    'getAllUsers',
    async ({ page, limit }, { getState, rejectWithValue, dispatch }) => {
        try {
            const response = await AdminUserService.getAllUsers(page, limit);
            return response;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    },
);

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
            .addCase(getAllUsers.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.hasMore = false;
                state.users = [];
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.users = action.payload.data;
                state.hasMore = action.payload.hasMore;
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
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
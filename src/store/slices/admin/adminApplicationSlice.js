import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import AdminApplicationsService from "../../../services/AdminApplicationsService";

let initialState = {
    applications: [],
    isLoading: true,
    error: null,
    hasMore: false,
    isLoadingUpdateApplication: true,
    errorUpdateApplication: false
}

export const getAllApplications = createAsyncThunk(
    'getAllApplications',
    async ({page, limit}, {getState, rejectWithValue, dispatch}) => {
        try {
            const response = await AdminApplicationsService.getAllApplications(page, limit);
            return response;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    },
);

export const updateApplication = createAsyncThunk(
    'updateApplication',
    async ({id, status}, {
        getState,
        rejectWithValue,
        dispatch
    }) => {
        try {
            const response = await AdminApplicationsService.updateApplication(id, status);
            return response?.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    },
);


const adminApplicationSlice = createSlice({
    name: 'adminApplicationSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllApplications.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.applications = [];
                state.hasMore = false;
            })
            .addCase(getAllApplications.fulfilled, (state, action) => {
                state.isLoading = false;
                state.applications = action.payload.data;
                state.hasMore = action.payload.hasMore;
            })
            .addCase(getAllApplications.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(updateApplication.pending, (state) => {
                state.isLoadingUpdateApplication = true;
                state.errorUpdateApplication = null;
            })
            .addCase(updateApplication.fulfilled, (state, action) => {
                state.isLoadingUpdateApplication = false;
            })
            .addCase(updateApplication.rejected, (state, action) => {
                state.isLoadingUpdateApplication = false;
                state.errorUpdateApplication = action.payload;
            })
    }
});

export const {} = adminApplicationSlice.actions;

export default adminApplicationSlice.reducer;

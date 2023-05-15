import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import ApplicationsService from "../../services/ApplicationsService";

let initialState = {
    myApplications: [],
    application: null,
    isLoadingMy: true,
    isLoading: true,
    error: null,
    errorMy: null,
    hasMore: false,
    isLoadingCreateApplication: true,
    errorCreateApplication: false
}

export const getMyApplications = createAsyncThunk(
    'getMyApplications',
    async ({page, limit}, {getState, rejectWithValue, dispatch}) => {
        try {
            const response = await ApplicationsService.getMyApplications(page, limit);
            return response;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    },
);

export const getApplicationById = createAsyncThunk(
    'getApplicationById',
    async (id, {getState, rejectWithValue, dispatch}) => {
        try {
            const response = await ApplicationsService.getApplicationById(id);
            return response?.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    },
);

export const createApplication = createAsyncThunk(
    'createApplication',
    async ({title, body}, {
        getState,
        rejectWithValue,
        dispatch
    }) => {
        try {
            const response = await ApplicationsService.createApplication(title, body);
            return response?.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    },
);


const applicationSlice = createSlice({
    name: 'applicationSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getMyApplications.pending, (state) => {
                state.isLoadingMy = true;
                state.errorMy = null;
                state.myApplications = [];
                state.hasMore = false;
            })
            .addCase(getMyApplications.fulfilled, (state, action) => {
                state.isLoadingMy = false;
                state.myApplications = action.payload.data;
                state.hasMore = action.payload.hasMore;
            })
            .addCase(getMyApplications.rejected, (state, action) => {
                state.isLoadingMy = false;
                state.errorMy = action.payload;
            })
            .addCase(getApplicationById.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getApplicationById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.application = action.payload;
            })
            .addCase(getApplicationById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(createApplication.pending, (state) => {
                state.isLoadingCreateApplication = true;
                state.errorCreateApplication = null;
            })
            .addCase(createApplication.fulfilled, (state, action) => {
                state.isLoadingCreateApplication = false;
            })
            .addCase(createApplication.rejected, (state, action) => {
                state.isLoadingCreateApplication = false;
                state.errorCreateApplication = action.payload;
            })
    }
});

export const {} = applicationSlice.actions;

export default applicationSlice.reducer;

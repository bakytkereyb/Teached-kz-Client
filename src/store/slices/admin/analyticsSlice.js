import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import AnalyticsService from '../../../services/AnalyticsService';

let initialState = {
    users: {
        isLoading: false,
        error: null,
        analytics: null,
    },
    competenceBank: {
        isLoading: false,
        error: null,
        analytics: null,
    },
    course: {
        isLoading: false,
        error: null,
        analytics: null,
    }
}

export const getUserAnalytics = createAsyncThunk(
    'getUserAnalytics',
    async (_, { getState, rejectWithValue, dispatch }) => {
        try {
            const response = await AnalyticsService.getUserAnalytics();
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    },
);

export const getCompetenceBankAnalytics = createAsyncThunk(
    'getCompetenceBankAnalytics',
    async (_, { getState, rejectWithValue, dispatch }) => {
        try {
            const response = await AnalyticsService.getCompetenceBankAnalytics();
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    },
);
export const getCourseAnalyticsById = createAsyncThunk(
    'getCourseAnalyticsById',
    async ({id}, { getState, rejectWithValue, dispatch }) => {
        try {
            const response = await AnalyticsService.getCourseAnalyticsById(id);
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    },
);

const analyticsSlice = createSlice({
    name: 'analyticsSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUserAnalytics.pending, (state) => {
                state.users.isLoading = true;
                state.users.error = null;
                state.users.analytics = null;
            })
            .addCase(getUserAnalytics.fulfilled, (state, action) => {
                state.users.isLoading = false;
                state.users.analytics = action.payload;
            })
            .addCase(getUserAnalytics.rejected, (state, action) => {
                state.users.isLoading = false;
                state.users.error = action.payload;
            })
            .addCase(getCompetenceBankAnalytics.pending, (state) => {
                state.competenceBank.isLoading = true;
                state.competenceBank.error = null;
                state.competenceBank.analytics = null;
            })
            .addCase(getCompetenceBankAnalytics.fulfilled, (state, action) => {
                state.competenceBank.isLoading = false;
                state.competenceBank.analytics = action.payload;
            })
            .addCase(getCompetenceBankAnalytics.rejected, (state, action) => {
                state.competenceBank.isLoading = false;
                state.competenceBank.error = action.payload;
            })
            .addCase(getCourseAnalyticsById.pending, (state) => {
                state.course.isLoading = true;
                state.course.error = null;
                state.course.analytics = null;
            })
            .addCase(getCourseAnalyticsById.fulfilled, (state, action) => {
                state.course.isLoading = false;
                state.course.analytics = action.payload;
            })
            .addCase(getCourseAnalyticsById.rejected, (state, action) => {
                state.course.isLoading = false;
                state.course.error = action.payload;
            })
    }
});

export const {} = analyticsSlice.actions;

export default analyticsSlice.reducer;
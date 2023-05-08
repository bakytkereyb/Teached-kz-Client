import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import CompetenceService from "../../services/CompetenceService";
import {getCompetenceBank} from "./competenceSlice";

let initialState = {
    questionnaire: null,
    isLoading: true,
    error: null,
}

export const getQuestionnaireById = createAsyncThunk(
    'getQuestionnaireById',
    async ({id}, { getState, rejectWithValue, dispatch }) => {
        try {
            const response = await CompetenceService.getQuestionnaireById(id);
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    },
);

const questionnaireSlice = createSlice({
    name: 'questionnaireSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getQuestionnaireById.pending, (state) => {
                state.isLoading = true;
                state.questionnaire = null;
            })
            .addCase(getQuestionnaireById.fulfilled, (state, action) => {
                state.questionnaire = action.payload;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(getQuestionnaireById.rejected, (state, action) => {
                state.isLoading = false;
                state.questionnaire = null;
                state.error = action.payload;
            })
    }
});

export const {} = questionnaireSlice.actions;

export default questionnaireSlice.reducer;
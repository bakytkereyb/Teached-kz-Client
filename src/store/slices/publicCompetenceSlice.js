import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import CompetenceService from "../../services/CompetenceService";
import {
    createAnketaBank,
    createComponentBank,
    deleteComponentById,
    deleteQuestionnaireById,
    getCompetenceBank
} from "./competenceSlice";

let initialState = {
    competenceBank: null,
    isLoading: true,
    error: null,
}

export const getCompetenceBankByUserId = createAsyncThunk(
    'getCompetenceBankByUserId',
    async ({id}, { getState, rejectWithValue, dispatch }) => {
        try {
            const response = await CompetenceService.getCompetenceBankByUserId(id);
            return response?.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    },
);

const publicCompetenceBankSlice = createSlice({
    name: 'publicCompetenceBankSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCompetenceBankByUserId.pending, (state) => {
                state.isLoading = true;
                state.competenceBank = null;
            })
            .addCase(getCompetenceBankByUserId.fulfilled, (state, action) => {
                state.competenceBank = action.payload;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(getCompetenceBankByUserId.rejected, (state, action) => {
                state.isLoading = false;
                state.competenceBank = null;
                state.error = action.payload;
            })
    }
});

export const {} = publicCompetenceBankSlice.actions;

export default publicCompetenceBankSlice.reducer;
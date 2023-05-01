import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import CompetenceService from "../../services/CompetenceService";

let initialState = {
    competenceBank: null,
    isLoading: true,
    error: null,
    isLoadingCreateComponent: false,
    errorCreatComponent: null,
    isLoadingCreateAnketa: false,
    errorCreatAnketa: null,
}

export const getCompetenceBank = createAsyncThunk(
    'getCompetenceBank',
    async (_, { getState, thunkAPI, dispatch }) => {
        try {
            const response = await CompetenceService.getCompetenceBank();
            return response?.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
    },
);

export const createComponentBank = createAsyncThunk(
    'createComponentBank',
    async ({name, nameKz, nameRu}, { getState, thunkAPI, dispatch }) => {
        try {
            const response = await CompetenceService.createComponentBank(name,nameKz,nameRu);
            return response?.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
    },
);

export const createAnketaBank = createAsyncThunk(
    'createAnketaBank',
    async ({data, componentId}, { getState, thunkAPI, dispatch }) => {
        try {
            const response = await CompetenceService.createAnketaBank(data, componentId);
            return response?.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
    },
);


const competenceBankSlice = createSlice({
    name: 'competenceBankSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCompetenceBank.pending, (state) => {
                state.isLoading = true;
                state.competenceBank = null;
            })
            .addCase(getCompetenceBank.fulfilled, (state, action) => {
                state.competenceBank = action.payload;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(getCompetenceBank.rejected, (state, action) => {
                state.isLoading = false;
                state.competenceBank = null;
                state.error = action.payload;
            })
            .addCase(createComponentBank.pending, (state) => {
                state.isLoadingCreateComponent = true;
                state.errorCreatComponent = null;
            })
            .addCase(createComponentBank.fulfilled, (state, action) => {
                state.isLoadingCreateComponent = false;
            })
            .addCase(createComponentBank.rejected, (state, action) => {
                state.isLoadingCreateComponent = false;
                state.errorCreatComponent = action.payload;
            })
            .addCase(createAnketaBank.pending, (state) => {
                state.isLoadingCreateAnketa = true;
                state.errorCreatAnketa = null;
            })
            .addCase(createAnketaBank.fulfilled, (state, action) => {
                state.isLoadingCreateAnketa = false;
            })
            .addCase(createAnketaBank.rejected, (state, action) => {
                state.isLoadingCreateAnketa = false;
                state.errorCreatAnketa = action.payload;
            })
    }
});

export const {} = competenceBankSlice.actions;

export default competenceBankSlice.reducer;
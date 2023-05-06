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
    isLoadingDeleteComponent: false,
    errorDeleteComponent: null,
    isLoadingDeleteQuestionnaire: false,
    errorDeleteQuestionnaire: null,
}

export const getCompetenceBank = createAsyncThunk(
    'getCompetenceBank',
    async (_, { getState, rejectWithValue, dispatch }) => {
        try {
            const response = await CompetenceService.getCompetenceBank();
            return response?.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    },
);

export const createComponentBank = createAsyncThunk(
    'createComponentBank',
    async ({name, nameKz, nameRu}, { getState, rejectWithValue, dispatch }) => {
        try {
            const response = await CompetenceService.createComponentBank(name,nameKz,nameRu);
            return response?.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    },
);

export const deleteComponentById = createAsyncThunk(
    'deleteComponentById',
    async ({id}, { getState, rejectWithValue, dispatch }) => {
        try {
            const response = await CompetenceService.deleteComponentById(id);
            return response?.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    },
);

export const deleteQuestionnaireById = createAsyncThunk(
    'deleteQuestionnaireById',
    async ({id}, { getState, rejectWithValue, dispatch }) => {
        try {
            const response = await CompetenceService.deleteQuestionnaireById(id);
            return response?.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    },
);

export const createAnketaBank = createAsyncThunk(
    'createAnketaBank',
    async ({data, componentId}, { getState, rejectWithValue, dispatch }) => {
        try {
            const response = await CompetenceService.createAnketaBank(data, componentId);
            return response?.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
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
            .addCase(deleteComponentById.pending, (state) => {
                state.isLoadingDeleteComponent = true;
                state.errorDeleteComponent = null;
            })
            .addCase(deleteComponentById.fulfilled, (state, action) => {
                state.isLoadingDeleteComponent = false;
            })
            .addCase(deleteComponentById.rejected, (state, action) => {
                state.isLoadingDeleteComponent = false;
                state.errorDeleteComponent = action.payload;
            })
            .addCase(deleteQuestionnaireById.pending, (state) => {
                state.isLoadingDeleteQuestionnaire = true;
                state.errorDeleteQuestionnaire = null;
            })
            .addCase(deleteQuestionnaireById.fulfilled, (state, action) => {
                state.isLoadingDeleteQuestionnaire = false;
            })
            .addCase(deleteQuestionnaireById.rejected, (state, action) => {
                state.isLoadingDeleteQuestionnaire = false;
                state.errorDeleteQuestionnaire = action.payload;
            })
    }
});

export const {} = competenceBankSlice.actions;

export default competenceBankSlice.reducer;
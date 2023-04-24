import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import UserService from "../../services/UserService";

let initialState = {
    user: null,
    isLoading: true,
    error: null,
    editUser: {
        username :"",
        firstName :"",
        secondName :"",
        middleName :"",
        birthDay :"",
        universityName :"",
        specializationName :"",
        admissionDate :"",
        graduationYear :0,
        degreeAwarded :"",
        universityJobName :"",
        position :"",
        degree :"",
        rank :"",
        disciplineNames :"",
        email :"",
    },
}

export const getUserByToken = createAsyncThunk(
    'getUserByToken',
    async (_, { getState, thunkAPI, dispatch }) => {
        try {
            const response = await UserService.getUserByToken();
            return response?.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
    },
);

export const updateUserByUsername = createAsyncThunk(
    'updateUserByUsername',
    async (data, { getState, thunkAPI, dispatch }) => {
        try {
            const response = await UserService.updateUserByUsername(data);
            return response?.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.data);
        }
    },
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
        },
        resetEditUser(state) {
            if (state.user === null) {
                state.editUser = initialState.editUser;
            } else {
                state.editUser.username = state.user.username;
                state.editUser.firstName = state.user.firstName;
                state.editUser.secondName = state.user.secondName;
                state.editUser.middleName = state.user.middleName;
                state.editUser.birthDay = state.user.birthDay;
                state.editUser.universityName = state.user.universityName;
                state.editUser.specializationName = state.user.specializationName;
                state.editUser.admissionDate = state.user.admissionDate;
                state.editUser.graduationYear = state.user.graduationYear;
                state.editUser.degreeAwarded = state.user.degreeAwarded;
                state.editUser.universityJobName = state.user.universityJobName;
                state.editUser.position = state.user.position;
                state.editUser.degree = state.user.degree;
                state.editUser.rank = state.user.rank;
                state.editUser.disciplineNames = state.user.disciplineNames;
                state.editUser.email = state.user.email;
            }
        },
        setFirstName(state, action) {
            state.editUser.firstName = action.payload;
        },
        setSecondName(state, action) {
            state.editUser.secondName = action.payload;
        },
        setMiddleName(state, action) {
            state.editUser.middleName = action.payload;
        },
        setBirthDay(state, action) {
            state.editUser.birthDay = action.payload;
        },
        setUniversityName(state, action) {
            state.editUser.universityName = action.payload;
        },
        setSpecializationName(state, action) {
            state.editUser.specializationName = action.payload;
        },
        setAdmissionDate(state, action) {
            state.editUser.admissionDate = action.payload;
        },
        setGraduationYear(state, action) {
            state.editUser.graduationYear = action.payload;
        },
        setDegreeAwarded(state, action) {
            state.editUser.degreeAwarded = action.payload;
        },
        setUniversityJobName(state, action) {
            state.editUser.universityJobName = action.payload;
        },
        setPosition(state, action) {
            state.editUser.position = action.payload;
        },
        setDegree(state, action) {
            state.editUser.degree = action.payload;
        },
        setRank(state, action) {
            state.editUser.rank = action.payload;
        },
        setDisciplineNames(state, action) {
            state.editUser.disciplineNames = action.payload;
        },
        setEmail(state, action) {
            state.editUser.email = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserByToken.pending, (state) => {
                state.isLoading = true;
                state.user = null;
            })
            .addCase(getUserByToken.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(getUserByToken.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.error = action.payload;
                localStorage.removeItem('Authorization');
            })
            .addCase(updateUserByUsername.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateUserByUsername.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(updateUserByUsername.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    }
});

export const {
    setUser,
    resetEditUser,
    setFirstName,
    setSecondName,
    setMiddleName,
    setBirthDay,
    setUniversityName,
    setSpecializationName,
    setAdmissionDate,
    setGraduationYear,
    setDegreeAwarded,
    setUniversityJobName,
    setPosition,
    setDegree,
    setRank,
    setDisciplineNames,
    setEmail,
} = userSlice.actions;

export default userSlice.reducer;
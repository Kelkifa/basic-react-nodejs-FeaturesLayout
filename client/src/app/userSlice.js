import userApi from "api/userApi";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getMe = createAsyncThunk('user/getMe', async (params, thunkAPI) => {
    // thunkAPI.dispatch(...)
    const currentUser = await userApi.getMe();
    return currentUser.data;
});

const userSlice = createSlice({
    name: 'user',
    initialState: {
        loading: false,
        error: null,
        userInfo: {},
    },
    reducers: {
        userLogout: (state, action) => {
            state.loading = false;
            state.error = null;
            state.userInfo = {};
            return state;
        }
    },
    extraReducers: {
        [getMe.pending]: (state, action) => {
            state.loading = true;
        },
        [getMe.rejected]: (state, action) => {
            state.loading = false;
            state.error = true;
        },
        [getMe.fulfilled]: (state, action) => {
            state.loading = false;
            state.error = false
            state.userInfo = action.payload;
        },
    }
});

const { reducer: userReducer, actions } = userSlice;
export const { userLogout } = actions;
export default userReducer;
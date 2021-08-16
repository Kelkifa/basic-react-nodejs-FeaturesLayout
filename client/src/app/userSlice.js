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
        loading: true,
        error: null,
        userInfo: {},
    },
    reducers: {},
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

const { reducer: userReducer } = userSlice;
export default userReducer;
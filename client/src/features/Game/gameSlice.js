import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import gameApi from "api/gameApi";

// USER
export const gameUserGet = createAsyncThunk('gameSlice/userGet', async () => {
    const response = await gameApi.getAll();
    return response;
})

// ADMIN
export const adminGet = createAsyncThunk('gameSlice/adminGet', async () => {
    const response = await gameApi.adminGetAll();
    return response;
});
export const gameAdminDelete = createAsyncThunk('gameSlice/adminDelete', async (data) => {
    const response = await gameApi.delete(data);
    return response;
})

const game = createSlice({
    name: 'games',
    initialState: {
        user: { loading: true, error: null, process: null, data: [] },
        admin: {
            list: { loading: true, error: null, process: null, data: [] },
            trash: { loading: true, error: null, process: null, data: [] }
        },
    },
    reducer: {},
    extraReducers: {
        /** userGet
         *  public
         */
        [gameUserGet.pending]: (state, action) => {
            state.user.loading = true;
        },
        [gameUserGet.rejected]: (state, action) => {
            state.user.loading = false;
            state.user.error = true;
        },
        [gameUserGet.fulfilled]: (state, action) => {
            state.user.loading = false;
            if (action.payload.success === false) {
                state.user.error = action.payload.message;
                return state;
            }
            state.user.error = false;
            state.user.data = action.payload.response;
            return state;
        },


        /** adminGet
         *  private
         */
        [adminGet.pending]: (state, action) => {
            state.admin.list.loading = true;
            state.admin.trash.loading = true;
        },
        [adminGet.rejected]: (state, action) => {
            state.admin.list.loading = false;
            state.admin.list.error = true;

            state.admin.trash.loading = false;
            state.admin.trash.error = true;
        },
        [adminGet.fulfilled]: (state, action) => {
            state.admin.list.loading = false;

            state.admin.trash.loading = false;

            if (!action.payload.success) {
                state.admin.list.error = action.payload.message;

                state.admin.trash.error = action.payload.message;
                return state;
            }

            state.admin.list.error = false;
            state.admin.list.data = action.payload.listResponse;

            state.admin.trash.error = false;
            state.admin.trash.data = action.payload.trashResponse;

            return state;
        },

        [gameAdminDelete.pending]: (state, action) => {
            state.admin.list.process = 'processing';
        },
        [gameAdminDelete.rejected]: (state, action) => {
            state.admin.list.process = 'error';
        },
        [gameAdminDelete.fulfilled]: (state, action) => {

            if (!action.payload.success) {
                state.admin.list.process = action.payload.message;
                return state;
            }

            state.admin.list.process = 'successfully';
            state.admin.list.data = state.admin.list.data.filter(game => !action.payload.response.includes(game._id));
            state.user.data = state.user.data.filter(game => !action.payload.response.includes(game._id));

            return state;
        }
    }
});

const { reducer: gameReducer } = game;

export default gameReducer;
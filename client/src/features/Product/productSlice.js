import productApi from "api/productApi";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");


// User
export const getAll = createAsyncThunk('product/getAll', async (params, thunkAPI) => {
    const response = await productApi.getAll();
    return response;
});


// Admin
export const adminGetAll = createAsyncThunk('product/adminGetAll', async () => {
    const response = await productApi.adminGetAll();
    return response;
});
export const deleteProducts = createAsyncThunk('product/deleteProducts', async (data) => {
    const response = await productApi.delete(data);
    return response;
});
export const forceDeleteProducts = createAsyncThunk('product/forceDeleteProducts', async (data) => {
    const response = await productApi.forceDelete(data);
    return response;
});
export const restoreProducts = createAsyncThunk('product/restoreProducts', async (data) => {
    const response = await productApi.restore(data);
    return response;
});

const product = createSlice({
    name: 'products',
    initialState: {
        user: {
            loading: true,
            error: null,
            data: [],
        },
        admin: {
            list: {
                loading: true,
                error: null,
                data: [],
            },
            trash: {
                loading: true,
                error: null,
                data: [],
            }
        }
    },
    reducers: {},
    extraReducers: {
        /**GET ALL
         * Public
         */
        [getAll.pending]: (state, action) => {
            state.user.loading = true;
        },
        [getAll.rejected]: (state, action) => {
            state.user.loading = false;
            state.user.error = true;
        },
        [getAll.fulfilled]: (state, action) => {
            state.user.loading = false;
            if (!action.payload.success) {
                state.user.error = action.payload.message;
                return state;
            }
            state.user.error = false;
            state.user.data = action.payload.response;
        },

        /** GET ALL
         * Private
         */
        [adminGetAll.pending]: (state, action) => {
            state.admin.list.loading = true;

            state.admin.trash.loading = true;
        },
        [adminGetAll.rejected]: (state, action) => {
            state.admin.list.loading = false;
            state.admin.list.error = true;

            state.admin.trash.loading = false;
            state.admin.trash.error = true;
        },
        [adminGetAll.fulfilled]: (state, action) => {
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
        /** DELETE
         *  Private
         */
        [deleteProducts.pending]: (state, action) => {
            state.admin.list.loading = true;
        },
        [deleteProducts.rejected]: (state, action) => {
            state.admin.list.loading = false;
            // state.admin.list.error = true;
        },
        [deleteProducts.fulfilled]: (state, action) => {
            state.admin.list.loading = false;
            if (!action.payload.success) {
                state.admin.list.error = action.payload.message;
                return state;
            }
            state.admin.list.error = false;

            state.admin.list.data = state.admin.list.data.filter(product => {
                if (!action.payload.response.includes(product._id)) {
                    return true;
                }
                // Push product to trash
                state.admin.trash.data.push(product);
                return false;
            });
            return state;
        },

        /** FORCE DELETE
         *  Private
         */
        [forceDeleteProducts.pending]: (state, action) => {
            state.admin.trash.loading = true;
        },
        [forceDeleteProducts.rejected]: (state, action) => {
            state.admin.trash.loading = false;
            state.admin.trash.error = true;
        },
        [forceDeleteProducts.fulfilled]: (state, action) => {
            state.admin.trash.loading = false;
            if (!action.payload.success) {
                state.admin.trash.error = action.payload.message;
                return state;
            }
            state.admin.trash.error = false;
            state.admin.trash.data = state.admin.trash.data.filter(product => !action.payload.response.includes(product._id));

            return state;
        },


        /** RESTORE
         *  Private
         */
        [restoreProducts.pending]: (state, action) => {
            state.admin.trash.loading = true;

            state.admin.list.loading = true;
        },
        [restoreProducts.rejected]: (state, action) => {
            state.admin.trash.loading = false;
            state.admin.trash.error = true;

            state.admin.list.loading = false;
        },
        [restoreProducts.fulfilled]: (state, action) => {
            state.admin.trash.loading = false;

            state.admin.list.loading = false;
            if (!action.payload.success) {
                state.admin.trash.error = action.payload.message;
                return state;
            }
            state.admin.trash.error = false;

            const restoredIds = action.payload.response.map(value => value._id);

            state.admin.trash.data = state.admin.trash.data.filter(product => !restoredIds.includes(product._id));

            state.admin.list.data = state.admin.list.data.concat(action.payload.response);

            return state;
        },
    }
});


const { reducer: productReducer } = product;
export default productReducer;
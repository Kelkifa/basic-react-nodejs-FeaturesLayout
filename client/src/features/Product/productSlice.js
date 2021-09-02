import { AiOutlineConsoleSql } from "react-icons/ai";
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
export const adminAddProduct = createAsyncThunk('product/adminAddProduct', async (data) => {
    const response = await productApi.add(data);
    return response;
})
export const updateProduct = createAsyncThunk('product/updateProduct', async (data) => {
    const response = await productApi.update(data);
    return response;
})
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
                process: { type: null, message: null },
            },
            trash: {
                loading: true,
                error: null,
                data: [],
                process: { type: null, message: null },
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
            console.log(action);
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

        /** Add new product
         *  Private
         */
        [adminAddProduct.pending]: (state, action) => {
            state.admin.list.process = { type: 'processing', message: 'Processing ...' };
        },
        [adminAddProduct.rejected]: (state, action) => {
            state.admin.list.process = { type: 'rejected', message: 'Client error' };
        },
        [adminAddProduct.fulfilled]: (state, action) => {
            if (!action.payload.success) {
                state.admin.list.process = { type: 'error', message: action.payload.message };
                return state;
            }
            state.admin.list.process = { type: 'fulfilled', message: action.payload.message };
            state.admin.list.data.push(action.payload.response);

            return state;
        },

        /** Update
         *  Private
         */
        [updateProduct.fulfilled]: (state, action) => {
            // Fail
            if (action.payload.success === false)
                return state;

            // Get index of product need to update
            const updatedProduct = action.payload.response;
            const updateProductIndex = state.admin.list.data.findIndex(value => value._id === updatedProduct._id);
            if (updateProductIndex === -1) return state;

            // Success
            state.admin.list.data.splice(updateProductIndex, 1, updatedProduct);
            return state;
        },
        /** DELETE
         *  Private
         */
        [deleteProducts.pending]: (state, action) => {
            state.admin.list.process = { type: 'processing', message: 'Processing ...' };
        },
        [deleteProducts.rejected]: (state, action) => {
            state.admin.list.process = { type: 'rejected', message: 'Client error' };
        },
        [deleteProducts.fulfilled]: (state, action) => {
            if (!action.payload.success) {
                state.admin.list.process = { type: 'error', message: action.payload.message };
                return state;
            }
            state.admin.list.prcess = { type: 'fulfilled', message: action.payload.message };

            state.admin.list.data = state.admin.list.data.filter(product => {
                if (!action.payload.response.includes(product._id)) {
                    return true;
                }
                // Push product to trash
                state.admin.trash.data.push(product);

                return false;
            });

            state.user.data = state.user.data.filter(product => !action.payload.response.includes(product._id));

            return state;
        },

        /** FORCE DELETE
         *  Private
         */
        [forceDeleteProducts.pending]: (state, action) => {
            state.admin.trash.process = { type: 'processing', message: 'Processing ...' };
        },
        [forceDeleteProducts.rejected]: (state, action) => {
            state.admin.trash.process = { type: 'rejected', message: 'Client error' };
        },
        [forceDeleteProducts.fulfilled]: (state, action) => {
            if (!action.payload.success) {
                state.admin.trash.prcess = { type: 'error', message: action.payload.message };
                return state;
            }
            state.admin.trash.data = state.admin.trash.data.filter(product => !action.payload.response.includes(product._id));

            state.admin.trash.prcess = { type: 'fulfilled', message: action.payload.message };

            return state;
        },


        /** RESTORE
         *  Private
         */
        [restoreProducts.pending]: (state, action) => {
            state.admin.trash.process = { type: 'processing', message: 'Processing ...' };
        },
        [restoreProducts.rejected]: (state, action) => {
            state.admin.trash.process = { type: 'rejected', message: 'Client error' }

            state.admin.list.loading = false;
        },
        [restoreProducts.fulfilled]: (state, action) => {
            if (!action.payload.success) {
                state.admin.trash.process = { type: 'error', message: action.payload.message }
                return state;
            }

            const restoredIds = action.payload.response.map(value => value._id);

            state.admin.trash.data = state.admin.trash.data.filter(product => !restoredIds.includes(product._id));

            state.admin.list.data = state.admin.list.data.concat(action.payload.response);
            state.admin.trash.process = { type: 'fulfilled', message: action.payload.message };
            return state;
        },
    }
});


const { reducer: productReducer } = product;
export default productReducer;
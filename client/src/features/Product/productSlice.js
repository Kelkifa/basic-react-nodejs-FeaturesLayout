import productApi from "api/productApi";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getAll = createAsyncThunk('product/getAll', async (params, thunkAPI) => {
    const response = await productApi.getAll();
    return response;
});

export const deleteProducts = createAsyncThunk('product/deleteProducts', async (data) => {
    const response = await productApi.delete(data);
    return response;
});

const product = createSlice({
    name: 'products',
    initialState: {
        loading: true,
        error: null,
        data: [],
    },
    reducers: {},
    extraReducers: {
        //GET ALL
        [getAll.pending]: (state, action) => {
            state.loading = true;
        },
        [getAll.rejected]: (state, action) => {
            state.loading = false;
            state.error = true;
        },
        [getAll.fulfilled]: (state, action) => {
            state.loading = false;
            if (!action.payload.success) {
                state.error = action.payload.message;
                return state;
            }
            state.error = false;
            state.data = action.payload.response;
        },

        // DELETE
        [deleteProducts.pending]: (state, action) => {
            state.loading = true;
        },
        [deleteProducts.rejected]: (state, action) => {
            state.loading = false;
            state.error = true;
        },
        [deleteProducts.fulfilled]: (state, action) => {
            state.loading = false;
            if (!action.payload.success) {
                state.error = action.payload.message;
                return state;
            }
            state.error = false;
            state.data = state.data.filter(product => !action.payload.response.includes(product._id));

            return state;
        },
    }
});


const { reducer: productReducer } = product;
export default productReducer;
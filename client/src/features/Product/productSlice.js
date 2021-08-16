import productApi from "api/productApi";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getAll = createAsyncThunk('product/getAll', async (params, thunkAPI) => {
    const response = await productApi.getAll()
    return response;
})

export const getOne = createAsyncThunk('product/getOne', async (params) => {
    console.log(params);
    const response = await productApi.getOne(params);
    return response;
})


const product = createSlice({
    name: 'products',
    initialState: {
        loading: true,
        error: null,
        products: [],
        product: {}
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
            state.error = false
            state.products = action.payload.response;
        },
        //GET ALL
        [getOne.pending]: (state, action) => {
            state.loading = true;
        },
        [getOne.rejected]: (state, action) => {
            state.loading = false;
            state.error = true;
        },
        [getOne.fulfilled]: (state, action) => {
            state.loading = false;
            state.error = false
            state.product = action.payload.response;
        },

    }
});


const { reducer: productReducer } = product;
export default productReducer;
import productApi from "api/productApi";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getAll = createAsyncThunk('product/getAll', async (params, thunkAPI) => {
    const response = await productApi.getAll()
    return response;
})

const product = createSlice({
    name: 'products',
    initialState: {
        loading: true,
        error: null,
        products: [],
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
    }
});


const { reducer: productReducer } = product;
export default productReducer;
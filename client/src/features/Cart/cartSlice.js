import cartApi from "api/cartApi";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getCarts = createAsyncThunk('carts/getCarts', async (params, thunkApi) => {
    // const carts = await 
    const carts = await cartApi.getAll();
    return carts;
});

export const addCart = createAsyncThunk('carts/addCarts', async (cartData) => {
    const response = await cartApi.addCart(cartData);
    return response;
})

const cart = createSlice({
    name: 'carts',
    initialState: {
        loading: true,
        error: null,
        data: [],
    },
    reducers: {},
    extraReducers: {
        // GET CART
        [getCarts.pending]: (state, action) => {
            state.loading = true;
        },
        [getCarts.rejected]: (state, action) => {
            state.loading = false;
            console.log(action);
            state.error = true;
        },
        [getCarts.fulfilled]: (state, action) => {
            console.log(action.payload);
            state.loading = false;
            if (action.payload.success !== true) {
                state.error = action.payload.message;
                return state;
            }
            state.error = false;
            state.data = action.payload.data;
            return state;
        },

        // ADD CART
        [addCart.pending]: (state, action) => {
            state.loading = true;
        },
        [addCart.rejected]: (state, action) => {
            state.loading = false;
            state.error = true;
        },
        [addCart.fulfilled]: (state, action) => {
            state.loading = false;
            if (action.payload.success !== true) {
                state.error = action.payload.message;
                return state;
            }
            console.log("[CART SLIDE]", state.carts);
            state.error = false;
            state.data.unshift(action.payload.response);
            return state;
        },
    }
});

const { reducer } = cart;

export default reducer;


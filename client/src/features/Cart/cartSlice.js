const { createSlice } = require("@reduxjs/toolkit");


const cart = createSlice({
    name: 'carts',
    initialState: [],
    reducers: {
        addCart: (state, action) => {
            state.push(action.payload);
        }
    }
});

const { reducer, actions } = cart;
export const { addCart } = actions;

export default reducer;


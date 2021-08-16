const { createSlice } = require("@reduxjs/toolkit");


const cart = createSlice({
    name: 'carts',
    initialState: [
        {
            id: '12312313532asdkjla1',
            name: 'Chậu hoa thu 1',
            description: 'Chau hao dep thu 1',
            color: 'red',
            cost: '100000',
            shape: 'shape x',
            soLuong: '1',
        }, {
            id: '12312313532asdkjla2',
            name: 'Chậu hoa thu 2',
            description: 'Chau hao dep thu 2 ',
            color: 'red',
            cost: '300000',
            shape: 'shape l',
            soLuong: '2',
        }, {
            id: '12312313532asdkjla3',
            name: 'Chậu hoa thu 3',
            description: 'Chau hao dep thu 3 ',
            color: 'yellow',
            cost: '2000009',
            shape: 'shape M',
            soLuong: '3',
        },
    ],
    reducers: {
        addCart: (state, action) => {
            state.push(action.payload);
        }
    }
});

const { reducer, actions } = cart;
export const { addCart } = actions;

export default reducer;


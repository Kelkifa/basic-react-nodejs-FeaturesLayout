import cartReducer from "../features/Cart/cartSlice";

const { configureStore } = require("@reduxjs/toolkit");

const rootReducer = {
    carts: cartReducer,
}

const store = configureStore({
    reducer: rootReducer,
});

export default store;
import cartReducer from "../features/Cart/cartSlice";
import userReducer from "./userSlice";

const { configureStore } = require("@reduxjs/toolkit");

const rootReducer = {
    carts: cartReducer,
    user: userReducer,
}

const store = configureStore({
    reducer: rootReducer,
});

export default store;
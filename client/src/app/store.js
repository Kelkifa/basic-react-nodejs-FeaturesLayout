import cartReducer from "../features/Cart/cartSlice";
import gameReducer from "features/Game/gameSlice";
import productReducer from "features/Product/productSlice";
import userReducer from "./userSlice";

const { configureStore } = require("@reduxjs/toolkit");

const rootReducer = {
    carts: cartReducer,
    user: userReducer,
    products: productReducer,
    games: gameReducer,
}

const store = configureStore({
    reducer: rootReducer,
});

export default store;
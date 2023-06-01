import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slice/products";
import filterReducer from "./slice/filter";
import cartReducer from "./slice/Cart";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    filter: filterReducer,
    cart: cartReducer,
  },
});

// Import the createSlice function from the "@reduxjs/toolkit" package
import { createSlice } from "@reduxjs/toolkit";

// Define the initial state for the cart
export const initialState = {
  cartItems: [],
  cartTotal: 0,
};

// Create a slice called "cart" using createSlice
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Action creator for setting the cart items
    setCartItems: (state, action) => {
      state.cartItems = action.payload.cartItems;
    },
    // Action creator for setting the cart total
    setCartTotal: (state, action) => {
      state.cartTotal = action.payload.cartTotal;
    },
  },
});

// Extract the generated action creators from cartSlice.actions
export const { setCartItems, setCartTotal } = cartSlice.actions;

// Export the cartSlice.reducer as the default export
export default cartSlice.reducer;

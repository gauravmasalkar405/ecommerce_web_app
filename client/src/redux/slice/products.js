import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  data: null,
  isError: false,
};

// Action -----> fetching products
export const fetchProducts = createAsyncThunk("fetchProducts", async () => {
  // fetch to retrieve products
  const productsResponse = await fetch(
    "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json"
  );
  return productsResponse.json();
});

const productsSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    // Update state when the fetchProducts action is pending
    builder.addCase(fetchProducts.pending, (state, action) => {
      state.isLoading = true;
    });

    // Update state when the fetchProducts action is fulfilled
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });

    // Update state when the fetchProducts action is rejected/failed
    builder.addCase(fetchProducts.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
    });
  },
});

export default productsSlice.reducer;

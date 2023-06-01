import { createSlice } from "@reduxjs/toolkit";

// Define the initial state of the filter slice
const initialState = {
  color: [],
  gender: [],
  type: [],
  price: [],
  searchTerm: "",
};

// Create the filter slice using createSlice
export const filterSlice = createSlice({
  name: "filter", // Name of the slice
  initialState, // Initial state
  reducers: {
    setColorFilter: (state, action) => {
      // Reducer for setting the color filter
      state.color = action.payload.color;
    },
    setGenderFilter: (state, action) => {
      // Reducer for setting the gender filter
      state.gender = action.payload.gender;
    },
    setTypeFilter: (state, action) => {
      // Reducer for setting the type filter
      state.type = action.payload.type;
    },
    setPriceFilter: (state, action) => {
      // Reducer for setting the price filter
      state.price = action.payload.price;
    },
    setSearchTerm: (state, action) => {
      // Reducer for setting the searchTerm
      state.searchTerm = action.payload.searchTerm;
    },
  },
});

// Extract individual action creators
export const {
  setColorFilter,
  setGenderFilter,
  setTypeFilter,
  setPriceFilter,
  setSearchTerm,
} = filterSlice.actions;

// Export the reducer function for the filter slice
export default filterSlice.reducer;

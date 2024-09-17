import { createSlice } from "@reduxjs/toolkit";

export const RestaurantSlice = createSlice({
  name: "restaurants",
  initialState: {
    restaurantData: null,
    restaurantMenu: null, 
  },
  reducers: {
    addRestaurantData: (state, action) => {
      state.restaurantData = action.payload;
    },
    addRestaurantMenu: (state, action) => {
      state.restaurantMenu = action.payload;
    },
    setPaymentLoading: (state, action) => {
      state.paymentLoading = action.payload;
    },
  },
});

export const { addRestaurantData, addRestaurantMenu, setPaymentLoading } =
  RestaurantSlice.actions;
export default RestaurantSlice.reducer;

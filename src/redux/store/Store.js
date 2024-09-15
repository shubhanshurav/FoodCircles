import { configureStore } from "@reduxjs/toolkit";
import { CartSlice } from "../slices/CartSlice";
import restaurantReducer from "../slices/RestaurantSlice";

export const store = configureStore({
  reducer: {
    cart: CartSlice.reducer,
    restaurants: restaurantReducer,
  },
});

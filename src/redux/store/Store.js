import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../slices/CartSlice";
import restaurantReducer from "../slices/RestaurantSlice";
import authReducer from "../slices/authSlice";
import profileReducer from "../slices/profileSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    restaurants: restaurantReducer,
    profile: profileReducer,
  },
});

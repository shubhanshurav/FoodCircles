// redux/slices/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  total: localStorage.getItem("total")
    ? JSON.parse(localStorage.getItem("total"))
    : 0,
  totalItems: localStorage.getItem("totalItems")
    ? JSON.parse(localStorage.getItem("totalItems"))
    : 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    add: (state, action) => {
      const { userId, menuItem, quantity } = action.payload;
      console.log(menuItem)

      // Compare based on whether menuItem is an object or an ID
      const existingItem = state.cart.find(
        (item) => item.menuItem.id === menuItem.id
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.cart.push({userId, menuItem, quantity });
      }

      state.total += quantity * action.payload.price; // Adjust based on your logic
      state.totalItems += quantity;

      // Sync with local storage
      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("total", JSON.stringify(state.total));
      localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
    },
    remove: (state, action) => {
      const { menuItem } = action.payload;
      // console.log("menuItemId",menuItem)

      const itemToRemove = state.cart.find(
        (item) => item.menuItem.id === menuItem // Compare IDs properly
      );

      if (itemToRemove) {
        state.cart = state.cart.filter(
          (item) => item.menuItem.id !== menuItem
        );

        state.total -= itemToRemove.quantity * action.payload.price;
        state.totalItems -= itemToRemove.quantity;

        // Sync with local storage
        localStorage.setItem("cart", JSON.stringify(state.cart));
        localStorage.setItem("total", JSON.stringify(state.total));
        localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
      }
    },
    resetCart: (state) => {
      state.cart = [];
      state.total = 0;
      state.totalItems = 0;

      // Sync with local storage
      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("total", JSON.stringify(state.total));
      localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
    },
  },
});


export const { setCart, add, remove, resetCart } = cartSlice.actions;
export default cartSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

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
  // initialState:[],
  reducers: {
    add: (state, action) => {
      const restaurant = action.payload;
      const index = state.cart.findIndex((item) => item._id === restaurant);

      if (index >= 0) {
        // If the restaurant is already in the cart, do not modify the quantity
        toast.error("restaurant already in cart");
        return;
      }
      // If the restaurant is not in the cart, add it to the cart
      state.cart.push(restaurant);
      // Update the total quantity and price
      state.totalItems++;
      state.total += restaurant.price;
      // Update to localstorage
      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("total", JSON.stringify(state.total));
      localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
      // show toast
      toast.success("restaurant added to cart");
    },
    remove: (state, action) => {
      const restaurantId = action.payload;
      const index = state.cart.findIndex((item) => item._id !== restaurantId);
      console.log(restaurantId,  index)

      if (index >= 0) {
        // If the restaurant is found in the cart, remove it
        state.totalItems--;
        state.total -= state.cart[index].price;
        state.cart.splice(index, 1);
        // Update to localstorage
        localStorage.setItem("cart", JSON.stringify(state.cart));
        localStorage.setItem("total", JSON.stringify(state.total));
        localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
        // show toast
        toast.success("restaurant removed from cart");
      }
    },
    resetCart: (state) => {
      state.cart = [];
      state.total = 0;
      state.totalItems = 0;
      // Update to localstorage
      localStorage.removeItem("cart");
      localStorage.removeItem("total");
      localStorage.removeItem("totalItems");
    },
  },
});

export const { add, remove, resetCart } = cartSlice.actions;

export default cartSlice.reducer;


// import { createSlice } from "@reduxjs/toolkit";

// export const CartSlice = createSlice({
//   name: "cart",
//   initialState: [],
//   reducers: {
//     add: (state, action) => {
//       state.push(action.payload);
//     },
//     remove: (state, action) => {
//       return state.filter((item) => item.id !== action.payload);
//     },
//     clearCart: (state) => {},
//   },
// });

// export const { add, remove } = CartSlice.actions;
// export default CartSlice.reducer;
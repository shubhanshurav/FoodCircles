// redux/thunks/cartThunks.js
import { apiConnector } from "../../services/apiConnector";
import { add, remove, setCart } from "../../redux/slices/CartSlice";
import { cartEndpoints } from "../../services/apis";

const {GET_CART_API, ADD_TO_CART_API, REMOVE_FROM_CART_API} = cartEndpoints;

export function addToCartThunk(userId, menuItem, quantity) {
console.log("menuItem1", menuItem);

  return async (dispatch) => {
    try {
      const response = await apiConnector("POST", ADD_TO_CART_API, {
        userId,
        menuItem,
        quantity,
      });
      
// console.log("menuItem  ===",response)

      if (response.data.success) {
        dispatch(add({ userId, menuItem, quantity }));
      }
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };
}

export function removeFromCartThunk(userId, menuItemId) {
  return async (dispatch) => {
    try {
      const response = await apiConnector("POST", REMOVE_FROM_CART_API, {
        userId,
        menuItemId,
      });

      if (response.data.success) {
        dispatch(remove({ menuItemId }));
      }
    } catch (error) {
      console.error("Failed to remove from cart:", error);
    }
  };
}

export function fetchCartThunk(userId) {
  return async (dispatch) => {
    try {
      const response = await apiConnector("GET", `${GET_CART_API}/${userId}`);

      if (response.data.success) {
        dispatch(setCart(response.data.cart));
      }
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    }
  };
}
